import nodemailer from 'nodemailer'
import type { QuoteRequest, BookingRequest, ContactRequest } from '@/types'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

const BRAND_NAME = process.env.BRAND_NAME || 'Fly Elite'
const EMAIL_FROM = process.env.EMAIL_FROM || 'no-reply@flyelite.fr'
const EMAIL_TO = process.env.EMAIL_TO || 'contact@flyelite.fr'

export async function sendQuoteEmail(data: QuoteRequest, airports: any[]) {
  const fromAirport = airports.find(a => a.code === data.from)
  const toAirport = airports.find(a => a.code === data.to)
  const typeLabel = data.type === 'round_trip' ? 'Aller-Retour' : 'Aller Simple'

  // Email au client
  const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0f4068; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .detail { margin: 10px 0; }
        .label { font-weight: bold; color: #0f4068; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${BRAND_NAME}</h1>
        </div>
        <div class="content">
          <h2>Confirmation de votre demande de devis</h2>
          <p>Bonjour ${data.contact.firstName},</p>
          <p>Nous avons bien reçu votre demande de devis pour un vol en jet privé.</p>
          
          <h3>Récapitulatif de votre demande :</h3>
          <div class="detail"><span class="label">Type :</span> ${typeLabel}</div>
          <div class="detail"><span class="label">Départ :</span> ${fromAirport?.city || data.from} (${data.from})</div>
          <div class="detail"><span class="label">Destination :</span> ${toAirport?.city || data.to} (${data.to})</div>
          <div class="detail"><span class="label">Date de départ :</span> ${data.depart.date} à ${data.depart.time}</div>
          ${data.return ? `<div class="detail"><span class="label">Date de retour :</span> ${data.return.date} à ${data.return.time}</div>` : ''}
          <div class="detail"><span class="label">Nombre de passagers :</span> ${data.pax}</div>
          ${data.notes ? `<div class="detail"><span class="label">Notes :</span> ${data.notes}</div>` : ''}
          
          <p style="margin-top: 30px;"><strong>Un responsable vous contactera dans les plus brefs délais pour vous assister.</strong></p>
          
          <p>Cordialement,<br>L'équipe ${BRAND_NAME}</p>
        </div>
        <div class="footer">
          <p>${BRAND_NAME} - Aviation d'Affaires<br>
          ${process.env.EMAIL_TO}</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Email interne
  const internalHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #0f4068; color: white; padding: 20px; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .detail { margin: 10px 0; padding: 10px; background: #f9f9f9; }
        .label { font-weight: bold; color: #0f4068; display: inline-block; width: 200px; }
        .json { background: #f4f4f4; padding: 15px; margin-top: 20px; overflow-x: auto; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🆕 NOUVELLE DEMANDE DE DEVIS</h1>
          <p>${fromAirport?.city || data.from} → ${toAirport?.city || data.to} - ${typeLabel}</p>
        </div>
        <div class="content">
          <h2>Informations du vol</h2>
          <div class="detail"><span class="label">Type :</span> ${typeLabel}</div>
          <div class="detail"><span class="label">Départ :</span> ${fromAirport?.name || data.from} (${data.from})</div>
          <div class="detail"><span class="label">Destination :</span> ${toAirport?.name || data.to} (${data.to})</div>
          <div class="detail"><span class="label">Date de départ :</span> ${data.depart.date} à ${data.depart.time}</div>
          ${data.return ? `<div class="detail"><span class="label">Date de retour :</span> ${data.return.date} à ${data.return.time}</div>` : ''}
          <div class="detail"><span class="label">Passagers :</span> ${data.pax}</div>
          
          <h2>Informations du client</h2>
          <div class="detail"><span class="label">Nom :</span> ${data.contact.firstName} ${data.contact.lastName}</div>
          <div class="detail"><span class="label">Email :</span> <a href="mailto:${data.contact.email}">${data.contact.email}</a></div>
          <div class="detail"><span class="label">Téléphone :</span> ${data.contact.phone}</div>
          ${data.notes ? `<div class="detail"><span class="label">Notes :</span> ${data.notes}</div>` : ''}
          <div class="detail"><span class="label">Consentement :</span> ${data.consent ? 'Oui' : 'Non'}</div>
          
          <div class="json">
            <strong>Données JSON :</strong>
            <pre>${JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  // Envoi des emails
  await Promise.all([
    transporter.sendMail({
      from: EMAIL_FROM,
      to: data.contact.email,
      subject: `Confirmation de votre demande - ${fromAirport?.city || data.from} → ${toAirport?.city || data.to} (${typeLabel})`,
      html: clientHtml,
    }),
    transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `[NOUVELLE DEMANDE] ${fromAirport?.city || data.from} → ${toAirport?.city || data.to} - ${typeLabel} - ${data.depart.date}`,
      html: internalHtml,
    }),
  ])
}

export async function sendBookingEmail(data: BookingRequest, airports: any[]) {
  const fromAirport = airports.find(a => a.code === data.from)
  const toAirport = airports.find(a => a.code === data.to)
  const typeLabel = data.type === 'round_trip' ? 'Aller-Retour' : 'Aller Simple'

  // Email au client
  const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0f4068; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .detail { margin: 10px 0; }
        .label { font-weight: bold; color: #0f4068; }
        .price { font-size: 24px; color: #69cce2; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${BRAND_NAME}</h1>
        </div>
        <div class="content">
          <h2>✅ Confirmation de votre réservation</h2>
          <p>Bonjour ${data.contact.firstName},</p>
          <p>Nous avons bien reçu votre demande de réservation.</p>
          
          <div class="price">Prix : ${new Intl.NumberFormat('fr-FR').format(data.price.amount)} ${data.price.currency}</div>
          
          <h3>Détails du vol :</h3>
          <div class="detail"><span class="label">Type :</span> ${typeLabel}</div>
          <div class="detail"><span class="label">Appareil :</span> ${data.aircraft}</div>
          <div class="detail"><span class="label">Départ :</span> ${fromAirport?.city || data.from} (${data.from})</div>
          <div class="detail"><span class="label">Destination :</span> ${toAirport?.city || data.to} (${data.to})</div>
          <div class="detail"><span class="label">Date :</span> ${data.depart.date}</div>
          <div class="detail"><span class="label">Horaires :</span> ${data.schedule.depart} - ${data.schedule.arrive}</div>
          <div class="detail"><span class="label">Durée :</span> ${Math.floor(data.flightTimeMin / 60)}h${data.flightTimeMin % 60}</div>
          <div class="detail"><span class="label">Passagers :</span> ${data.pax} / ${data.seats}</div>
          
          <p style="margin-top: 30px;"><strong>Un responsable vous contactera dans les plus brefs délais pour finaliser votre réservation.</strong></p>
          
          <p>Cordialement,<br>L'équipe ${BRAND_NAME}</p>
        </div>
        <div class="footer">
          <p>${BRAND_NAME} - Aviation d'Affaires<br>
          ${process.env.EMAIL_TO}</p>
        </div>
      </div>
    </body>
    </html>
  `

  // Email interne
  const internalHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #0f4068; color: white; padding: 20px; }
        .price { font-size: 28px; color: #69cce2; font-weight: bold; margin: 20px 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .detail { margin: 10px 0; padding: 10px; background: #f9f9f9; }
        .label { font-weight: bold; color: #0f4068; display: inline-block; width: 200px; }
        .json { background: #f4f4f4; padding: 15px; margin-top: 20px; overflow-x: auto; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 NOUVELLE RÉSERVATION - OFFRE DU MOMENT</h1>
          <p>${fromAirport?.city || data.from} → ${toAirport?.city || data.to}</p>
          <div class="price">${new Intl.NumberFormat('fr-FR').format(data.price.amount)} ${data.price.currency}</div>
        </div>
        <div class="content">
          <h2>Informations du vol</h2>
          <div class="detail"><span class="label">ID Offre :</span> ${data.offerId}</div>
          <div class="detail"><span class="label">Type :</span> ${typeLabel}</div>
          <div class="detail"><span class="label">Appareil :</span> ${data.aircraft}</div>
          <div class="detail"><span class="label">Départ :</span> ${fromAirport?.name || data.from} (${data.from})</div>
          <div class="detail"><span class="label">Destination :</span> ${toAirport?.name || data.to} (${data.to})</div>
          <div class="detail"><span class="label">Date :</span> ${data.depart.date}</div>
          <div class="detail"><span class="label">Horaires :</span> ${data.schedule.depart} - ${data.schedule.arrive}</div>
          <div class="detail"><span class="label">Durée :</span> ${Math.floor(data.flightTimeMin / 60)}h${data.flightTimeMin % 60}</div>
          <div class="detail"><span class="label">Passagers :</span> ${data.pax} / ${data.seats}</div>
          
          <h2>Informations du client</h2>
          <div class="detail"><span class="label">Nom :</span> ${data.contact.firstName} ${data.contact.lastName}</div>
          <div class="detail"><span class="label">Email :</span> <a href="mailto:${data.contact.email}">${data.contact.email}</a></div>
          <div class="detail"><span class="label">Téléphone :</span> ${data.contact.phone}</div>
          ${data.notes ? `<div class="detail"><span class="label">Notes :</span> ${data.notes}</div>` : ''}
          
          <div class="json">
            <strong>Données JSON :</strong>
            <pre>${JSON.stringify(data, null, 2)}</pre>
          </div>
        </div>
      </div>
    </body>
    </html>
  `

  await Promise.all([
    transporter.sendMail({
      from: EMAIL_FROM,
      to: data.contact.email,
      subject: `Confirmation de réservation - ${fromAirport?.city || data.from} → ${toAirport?.city || data.to}`,
      html: clientHtml,
    }),
    transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `[RÉSERVATION] ${fromAirport?.city || data.from} → ${toAirport?.city || data.to} - ${new Intl.NumberFormat('fr-FR').format(data.price.amount)} ${data.price.currency}`,
      html: internalHtml,
    }),
  ])
}

export async function sendContactEmail(data: ContactRequest) {
  const clientHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0f4068; color: white; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 30px; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>${BRAND_NAME}</h1>
        </div>
        <div class="content">
          <h2>Merci de nous avoir contactés</h2>
          <p>Bonjour ${data.firstName},</p>
          <p>Nous avons bien reçu votre message et nous vous remercions de l'intérêt que vous portez à ${BRAND_NAME}.</p>
          <p>Notre équipe vous répondra dans les plus brefs délais.</p>
          <p>Cordialement,<br>L'équipe ${BRAND_NAME}</p>
        </div>
        <div class="footer">
          <p>${BRAND_NAME} - Aviation d'Affaires<br>
          ${process.env.EMAIL_TO}</p>
        </div>
      </div>
    </body>
    </html>
  `

  const internalHtml = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 800px; margin: 0 auto; padding: 20px; }
        .header { background: #0f4068; color: white; padding: 20px; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .detail { margin: 10px 0; padding: 10px; background: #f9f9f9; }
        .label { font-weight: bold; color: #0f4068; display: inline-block; width: 150px; }
        .message { background: #f9f9f9; padding: 20px; margin: 20px 0; border-left: 4px solid #0f4068; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>📧 NOUVEAU MESSAGE DE CONTACT</h1>
        </div>
        <div class="content">
          <h2>Informations du contact</h2>
          <div class="detail"><span class="label">Nom :</span> ${data.firstName} ${data.lastName}</div>
          <div class="detail"><span class="label">Email :</span> <a href="mailto:${data.email}">${data.email}</a></div>
          ${data.phone ? `<div class="detail"><span class="label">Téléphone :</span> ${data.phone}</div>` : ''}
          
          <h2>Message</h2>
          <div class="message">${data.message.replace(/\n/g, '<br>')}</div>
        </div>
      </div>
    </body>
    </html>
  `

  await Promise.all([
    transporter.sendMail({
      from: EMAIL_FROM,
      to: data.email,
      subject: `Confirmation de votre message - ${BRAND_NAME}`,
      html: clientHtml,
    }),
    transporter.sendMail({
      from: EMAIL_FROM,
      to: EMAIL_TO,
      subject: `[CONTACT] Message de ${data.firstName} ${data.lastName}`,
      html: internalHtml,
      replyTo: data.email,
    }),
  ])
}
