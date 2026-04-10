import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="mx-auto flex max-w-2xl flex-col gap-12 px-4">
      <section className="flex h-svh flex-col justify-center gap-6">
        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs uppercase tracking-widest">
            Heading
          </span>

          <h1 className="text-4xl">Welcome to My Portfolio</h1>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs uppercase tracking-widest">
            Sans
          </span>

          <p className="text-base">
            This is a comprehensive portfolio showcasing my work as a full-stack
            developer. I specialize in building modern web applications with
            cutting-edge technologies, creating seamless user experiences, and
            writing clean, maintainable code that scales.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs uppercase tracking-widest">
            Mono
          </span>

          <pre className="bg-muted p-4 font-mono text-sm">
            {`const greeting = "Hello, World!";

function sayHello() {
  console.log(greeting);
}

sayHello();`}
          </pre>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-muted-foreground text-xs uppercase tracking-widest">
            Buttons
          </span>

          <div className="flex gap-4">
            <Button>Default</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>

            <div className="ml-auto">
              <ModeToggle />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
