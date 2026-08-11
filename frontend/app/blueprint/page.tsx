import type { Metadata } from 'next';
import BlueprintPageShell from '@/components/BlueprintPageShell';

export const metadata: Metadata = {
  title: 'Blueprint — UNSW Engineering Society',
  description: 'Explore UNSW Engineering Society — events, jobs board, programs, sponsors and our team.',
};

export default function BlueprintPage() {
  return <BlueprintPageShell />;
}
