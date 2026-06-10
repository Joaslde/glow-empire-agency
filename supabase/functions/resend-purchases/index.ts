// Supabase Edge Function — Renvoi des ebooks par email.
// L'utilisateur saisit son email ; on lui renvoie un email contenant un bouton
// de téléchargement pour CHAQUE ebook qu'il a acheté. Pas d'OTP, pas de login.

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!
const SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY') ?? ''
const SITE_URL = Deno.env.get('SITE_URL') ?? 'https://glow-empire-agency.com'
const EMAIL_FROM = Deno.env.get('EMAIL_FROM') ?? 'Glow Empire <contact@glow-empire-agency.com>'

const admin = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
}

function isValidEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  if (req.method !== 'POST') return json({ error: 'method_not_allowed' }, 405)

  let body: { email?: string }
  try {
    body = await req.json()
  } catch {
    return json({ error: 'bad_request' }, 400)
  }

  const email = (body.email ?? '').trim()
  if (!isValidEmail(email)) return json({ error: 'invalid_email' }, 400)

  // Récupère tous les achats de cet email (dédoublonnés par livre)
  const { data: purchases } = await admin
    .from('purchases')
    .select('book_id, download_token, books(title)')
    .ilike('email', email)
    .order('created_at', { ascending: false })

  // Réponse générique (on ne révèle jamais si l'email a des achats ou non)
  const generic = { ok: true }

  if (!purchases || purchases.length === 0) return json(generic)
  if (!RESEND_API_KEY) return json(generic)

  // Dédoublonne par book_id (garde le 1er token vu)
  const seen = new Set<string>()
  const unique = purchases.filter((p: any) => {
    if (seen.has(p.book_id)) return false
    seen.add(p.book_id)
    return true
  })

  const items = unique
    .map((p: any) => {
      const title = p.books?.title ?? p.book_id
      const dl = `${SUPABASE_URL}/functions/v1/download-ebook?token=${p.download_token}`
      return `
        <tr>
          <td style="padding:10px 0;color:#0b1f33;font-size:15px">${title}</td>
          <td style="padding:10px 0;text-align:right">
            <a href="${dl}" style="display:inline-block;padding:10px 18px;background:#00A3FF;
               color:#fff;text-decoration:none;border-radius:100px;font-weight:700;font-size:14px">
              Télécharger
            </a>
          </td>
        </tr>`
    })
    .join('')

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:520px;margin:auto;color:#0b1f33">
      <h2 style="color:#0E3975">Vos ebooks Glow Empire</h2>
      <p>Voici les ebooks rattachés à cet email :</p>
      <table style="width:100%;border-collapse:collapse">${items}</table>
      <p style="color:#5b6b7d;font-size:13px;margin-top:20px">
        Conservez cet email : ces liens vous permettent de télécharger vos ebooks à tout moment.
      </p>
      <p style="color:#9aa7b4;font-size:12px">Glow Empire — ${SITE_URL}</p>
    </div>`

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: EMAIL_FROM,
        to: [email],
        subject: 'Vos ebooks Glow Empire',
        html,
      }),
    })
  } catch (e) {
    console.error('[resend-purchases] échec envoi', e)
  }

  return json(generic)
})
