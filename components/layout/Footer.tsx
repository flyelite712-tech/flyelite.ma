'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'
import settings from '@/data/settings.json'
import { useLanguage } from '@/contexts/LanguageContext'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { t } = useLanguage()

  const menuLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.concept'), href: '/notre-concept' },
    { name: t('nav.faq'), href: '/faq' },
    { name: t('nav.contact'), href: '/contact' },
  ]

  const legalLinks = [
    { name: t('footer.legalNotice'), href: '/mentions-legales' },
    { name: t('footer.termsOfSale'), href: '/cgv' },
    { name: t('footer.termsOfUse'), href: '/cgu' },
  ]

  const resourceLinks = [
    { name: t('footer.resourcesLink'), href: '/ressources' },
    { name: t('footer.pressRelease'), href: '/presse' },
  ]

  const socialIcons = [
    { name: 'Instagram', icon: Instagram, href: settings.contact.social.instagram },
    { name: 'Facebook', icon: Facebook, href: settings.contact.social.facebook },
    { name: 'Twitter', icon: Twitter, href: settings.contact.social.twitter },
    { name: 'LinkedIn', icon: Linkedin, href: settings.contact.social.linkedin },
  ]

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <Image
              src={settings.brand.logo}
              alt={settings.brand.name}
              width={150}
              height={50}
              className="h-16 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-sm text-gray-300">
              {t('footer.description')}
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-bold mb-4">{t('footer.menu')}</h3>
            <ul className="space-y-2">
              {menuLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Légal */}
          <div>
            <h3 className="font-bold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Ressources */}
          <div>
            <h3 className="font-bold mb-4">{t('footer.resources')}</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-gray-300 hover:text-accent transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            
            {/* Social Media */}
            <div className="mt-6">
              <div className="flex space-x-4">
                {socialIcons.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-accent transition-colors"
                      aria-label={social.name}
                    >
                      <Icon size={20} />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-400">
          <p className="mb-2">
            {currentYear} © {settings.brand.name}. {t('footer.rights')}
          </p>
          <p className="text-xs">
            {t('footer.developedBy')}{' '}
            <a 
              href="https://mehdicodes.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-accent font-semibold hover:underline transition-all"
            >
              Mehdi Codes
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
