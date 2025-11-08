'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Facebook, Twitter, Linkedin } from 'lucide-react'
import settings from '@/data/settings.json'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const menuLinks = [
    { name: 'Vols', href: '/' },
    { name: 'Notre concept', href: '/notre-concept' },
    { name: 'FAQ', href: '/faq' },
    { name: 'Contact', href: '/contact' },
  ]

  const legalLinks = [
    { name: 'Mentions légales', href: '/mentions-legales' },
    { name: 'CGV', href: '/cgv' },
    { name: 'CGU', href: '/cgu' },
  ]

  const resourceLinks = [
    { name: 'Ressources', href: '/ressources' },
    { name: 'Communiqué de presse', href: '/presse' },
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
              Louez votre jet privé. En 5 minutes, au meilleur prix !
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="font-bold mb-4">MENU</h3>
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
            <h3 className="font-bold mb-4">LÉGALES</h3>
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
            <h3 className="font-bold mb-4">RESSOURCES</h3>
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
            {currentYear} © {settings.brand.name}. All rights reserved.
          </p>
          <p className="text-xs">
            Développé avec excellence et passion par{' '}
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
