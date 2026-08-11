import type { Metadata } from 'next';
import ContactPageShell from '@/components/ContactPageShell';

export const metadata: Metadata = {
  title: 'Contact — UNSW Engineering Society',
  description: 'Get in touch with the UNSW Engineering Society team.',
};

export default function ContactPage() {
  return <ContactPageShell />;
}
