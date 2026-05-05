import { FaGithub, FaLinkedinIn, FaWhatsapp } from "react-icons/fa6";

export function GithubBrandIcon({ className }: { className?: string }) {
  return <FaGithub aria-hidden className={className} />;
}

export function LinkedinBrandIcon({ className }: { className?: string }) {
  return <FaLinkedinIn aria-hidden className={className} />;
}

export function WhatsappBrandIcon({ className }: { className?: string }) {
  return <FaWhatsapp aria-hidden className={className} />;
}
