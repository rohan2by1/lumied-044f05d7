
import Layout from "@/components/layout/Layout";

export default function Community() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-6">Community</h1>
        <p className="text-lg text-muted-foreground mb-6">
          Join our vibrant community of learners and educators.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Discussion Forums</h2>
            <p className="mb-4">
              Engage with fellow students and instructors in our topic-based forums.
            </p>
          </div>
          <div className="bg-card p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold mb-4">Study Groups</h2>
            <p className="mb-4">
              Connect with others taking the same courses to study together.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
