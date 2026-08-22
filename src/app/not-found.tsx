import { Container } from "@/components/layout/container";
import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col justify-center py-24">
      <p className="text-muted text-xs tracking-[0.2em] uppercase">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-tight">
        Page not found
      </h1>
      <div className="mt-8">
        <ButtonLink href="/" variant="ghost">
          Back home
        </ButtonLink>
      </div>
    </Container>
  );
}
