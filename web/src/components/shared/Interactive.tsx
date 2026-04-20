'use client'
import {useEffect} from 'react'
import type {CTA} from '@/sanity/types'
import {ctaHref, ctaTarget} from '@/lib/cta'

export function CtaLink({cta, className}: {cta: CTA; className?: string}) {
  const style = cta.style || 'primary'
  const cls =
    style === 'primary' ? 'btn btn-primary' :
    style === 'outline' ? 'btn btn-outline-dark' :
    'btn'
  return (
    <a
      href={ctaHref(cta)}
      target={ctaTarget(cta)}
      rel={ctaTarget(cta) ? 'noopener' : undefined}
      className={`${cls} ${className || ''}`}
    >
      {cta.label}
    </a>
  )
}

export function RevealInit() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        })
      },
      {threshold: 0.08, rootMargin: '0px 0px -40px 0px'},
    )
    document.querySelectorAll('.reveal:not(.in)').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
  return null
}

export function ScrollNav() {
  useEffect(() => {
    const nav = document.getElementById('nav')
    if (!nav) return
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20)
    document.addEventListener('scroll', onScroll, {passive: true})
    onScroll()
    return () => document.removeEventListener('scroll', onScroll)
  }, [])
  return null
}

export function SmoothScroll() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') || ''
      if (href.length < 2) return
      const target = document.querySelector(href)
      if (!target) return
      e.preventDefault()
      const y = (target as HTMLElement).getBoundingClientRect().top + window.scrollY - 60
      window.scrollTo({top: y, behavior: 'smooth'})
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])
  return null
}
