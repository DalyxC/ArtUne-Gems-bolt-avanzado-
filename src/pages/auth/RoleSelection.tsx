import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music2, Users, Shield } from 'lucide-react';

const RoleSelection = () => {
  const navigate = useNavigate();

  const roles = [
    {
      id: 'artist',
      title: 'Artist',
      description: 'Showcase your talent and get booked for events',
      icon: Music2,
      path: '/auth/signup/artist',
      color: 'text-primary',
    },
    {
      id: 'client',
      title: 'Client',
      description: 'Find and book talented artists for your events',
      icon: Users,
      path: '/auth/signup/client',
      color: 'text-accent',
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Join ArtUne</h1>
          <p className="text-muted-foreground">Choose your role to get started</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role) => {
            const Icon = role.icon;
            return (
              <Card
                key={role.id}
                className="border-border/50 hover:border-primary/50 transition-all cursor-pointer group"
                onClick={() => navigate(role.path)}
              >
                <CardHeader className="text-center">
                  <div className={`mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors`}>
                    <Icon className={`w-8 h-8 ${role.color}`} />
                  </div>
                  <CardTitle className="text-2xl">{role.title}</CardTitle>
                  <CardDescription className="text-base">{role.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button className="w-full" variant="outline">
                    Continue as {role.title}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-muted-foreground">
            Already have an account?{' '}
            <a href="/auth/login" className="text-primary hover:underline">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
