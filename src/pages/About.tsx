
import Layout from "@/components/layout/Layout";

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-6">About Us</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-muted-foreground mb-6">
              LumiED is dedicated to making quality education accessible to
              everyone. Our platform connects passionate instructors with eager
              students from around the world.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              To democratize education by providing affordable, high-quality
              online courses that help people acquire valuable skills and
              knowledge.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Story</h2>
            <p>
              Founded in 2023, LumiED began with a simple idea: learning should
              be accessible, engaging, and tailored to each individual's needs.
              What started as a small collection of programming tutorials has
              grown into a comprehensive platform covering dozens of subjects.
            </p>

            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
            <p>
              We're a diverse team of educators, engineers, and designers
              passionate about transforming how people learn online. Together,
              we're building tools and experiences that make learning more
              effective and enjoyable.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
