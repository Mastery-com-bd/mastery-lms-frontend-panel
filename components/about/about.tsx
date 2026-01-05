"use client"

import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Target,
  Users,
  Award,
  Globe,
  Heart,
  Lightbulb,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";

const About = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description:
        "We believe education should be accessible to everyone, everywhere.",
    },
    {
      icon: Heart,
      title: "Student-First",
      description:
        "Every decision we make starts with how it benefits our learners.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "We constantly evolve our platform to deliver the best learning experience.",
    },
    {
      icon: Globe,
      title: "Global Community",
      description: "Connecting learners and instructors from around the world.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Active Students" },
    { value: "500+", label: "Expert Instructors" },
    { value: "1000+", label: "Courses" },
    { value: "95%", label: "Satisfaction Rate" },
  ];

  const team = [
    { name: "Sarah Johnson", role: "CEO & Founder", avatar: "SJ" },
    { name: "Michael Chen", role: "CTO", avatar: "MC" },
    { name: "Emily Davis", role: "Head of Education", avatar: "ED" },
    { name: "James Wilson", role: "Head of Design", avatar: "JW" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 via-background to-secondary/10" />
          <div className="absolute top-20 right-20 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse" />

          <div className="container mx-auto px-4 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className="text-center max-w-4xl mx-auto"
            >
              <Badge
                variant="outline"
                className="mb-6 px-4 py-1 border-primary/50"
              >
                <Award className="w-4 h-4 mr-2" />
                About Us
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Empowering Learners to{" "}
                <span className="bg-linear-to-r from-primary via-secondary to-primary bg-clip-text text-transparent bg-size-[200%] animate-[gradient_3s_linear_infinite]">
                  Transform Their Future
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We&lsquo;re on a mission to democratize education and make
                high-quality learning accessible to everyone, regardless of
                their background or location.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 border-y border-border/50">
          <div className="container mx-auto px-4">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="text-center"
                >
                  <motion.span
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.1,
                    }}
                    className="block text-4xl md:text-5xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent"
                  >
                    {stat.value}
                  </motion.span>
                  <span className="text-muted-foreground mt-2 block">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Badge variant="secondary" className="mb-4">
                  Our Mission
                </Badge>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Breaking Barriers in Education
                </h2>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  We founded this platform with a simple yet powerful vision: to
                  create a world where anyone can learn anything, from anyone,
                  anywhere. We believe that education is the great equalizer,
                  and technology can help us reach those who need it most.
                </p>
                <ul className="space-y-3">
                  {[
                    "Accessible courses for all skill levels",
                    "Expert instructors from top industries",
                    "Flexible learning at your own pace",
                    "Community-driven support and mentorship",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="aspect-square rounded-2xl bg-linear-to-br from-primary/20 via-secondary/20 to-primary/20 p-8 flex items-center justify-center">
                  <div className="grid grid-cols-2 gap-4 w-full">
                    {values.map((value, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05, rotate: 2 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-card/80 backdrop-blur-sm rounded-xl p-4 border border-border/50"
                      >
                        <value.icon className="w-8 h-8 text-primary mb-2" />
                        <h4 className="font-semibold text-sm">{value.title}</h4>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                Our Values
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                What We Stand For
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {values.map((value, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="w-14 h-14 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors"
                      >
                        <value.icon className="w-7 h-7 text-primary" />
                      </motion.div>
                      <h3 className="text-lg font-semibold mb-2">
                        {value.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <Badge variant="secondary" className="mb-4">
                <Users className="w-4 h-4 mr-2" />
                Our Team
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold">
                Meet the People Behind the Platform
              </h2>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
            >
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-20 h-20 mx-auto mb-4 rounded-full bg-linear-to-br from-primary to-secondary flex items-center justify-center text-2xl font-bold text-primary-foreground"
                  >
                    {member.avatar}
                  </motion.div>
                  <h4 className="font-semibold">{member.name}</h4>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-3xl bg-linear-to-r from-primary/20 via-secondary/20 to-primary/20 p-12 text-center overflow-hidden"
            >
              <div className="absolute inset-0 bg-grid-white/5" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  Ready to Start Learning?
                </h2>
                <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
                  Join thousands of learners who are already transforming their
                  careers with our platform.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild size="lg" className="group">
                    <Link href="/courses">
                      Explore Courses
                      <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link href="/instructors">Meet Instructors</Link>
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
