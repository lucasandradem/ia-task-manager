import {
  CheckSquare,
  Clock,
  Lightbulb,
  Shield,
  Target,
  TestTube,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

export function TaskContent() {
  const taskData = {
    title: "Secure Login Form with Authentication",
    description:
      "Implement a modern login form with field validation, session-based authentication, and real-time error feedback.",
    estimated_time: "2 days",
    steps: [
      "Create a form component using React",
      "Add field validation using a suitable library",
      "Connect backend for user authentication",
      "Persist sessions using SQLite",
      "Test full login and logout flow",
    ],
    suggested_tests: [
      "it('should render login form correctly')",
      "it('should validate input fields')",
      "it('should authenticate valid credentials')",
      "it('should prevent access with invalid credentials')",
    ],
    acceptance_criteria: [
      "Login form displays properly with required fields",
      "Invalid input is correctly flagged",
      "Valid users can log in and maintain a session",
      "Users are redirected upon login and logout",
    ],
    implementation_suggestion:
      "Use React Hook Form for input validation, Prisma ORM for managing user data, and configure protected routes using React Router 7.",
  };

  return (
    <section>
      <div className="h-full max-h-[600px] overflow-y-auto">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                {taskData.title}
              </CardTitle>
              <CardDescription>{taskData.description}</CardDescription>
            </CardHeader>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Tempo Estimado
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-lg font-medium">{taskData.estimated_time}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckSquare className="h-5 w-5" />
                Passos de Implementação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {taskData.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="bg-primary text-primary-foreground rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-0.5">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TestTube className="h-5 w-5" />
                Testes Sugeridos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {taskData.suggested_tests.map((test, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">•</span>
                    <code className="text-sm bg-muted px-2 py-1 rounded">
                      {test}
                    </code>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Critérios de Aceitação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {taskData.acceptance_criteria.map((criteria, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckSquare className="h-4 w-4 text-blue-500 mt-1 flex-shrink-0" />
                    <span>{criteria}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5" />
                Sugestão de Implementação
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                {taskData.implementation_suggestion}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button>Salvar Task</Button>
      </div>
    </section>
  );
}
