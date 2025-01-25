import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const comments = [
  {
    name: "Alice Johnson",
    role: "Frontend Developer",
    comment:
      "This hosting service has been a game-changer for our team. The deployment process is smooth, and the performance is outstanding.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Bob Smith",
    role: "CTO",
    comment:
      "We've tried several hosting providers, but this one stands out. The scalability and reliability have been crucial for our growing business.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Carol Davis",
    role: "Startup Founder",
    comment:
      "As a startup, we needed a hosting solution that could grow with us. This platform has exceeded our expectations in every way.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function UserComments() {
  return (
    <section className="py-24 px-6">
      <h2 className="text-4xl font-bold text-center mb-12">Lo que dicen los usuarios de Ride</h2>
      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {comments.map((comment) => (
          <Card key={comment.name}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <img
                  src={comment.avatar || "/placeholder.svg"}
                  alt={comment.name}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <CardTitle>{comment.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{comment.role}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">&ldquo;{comment.comment}&rdquo;</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

