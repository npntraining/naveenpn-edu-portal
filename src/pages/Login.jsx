import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  deleteUser,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import Session from "./Session";
import { auth, db } from "@/firebase";
import Loading from "@/components/Loader";
import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { coursesList } from "@/data/global_config";
import { collection, getDocs, query } from "firebase/firestore";

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [authChecking, setAuthChecking] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const formSchema = z.object({
    code: z.string().min(1, {
      message: "Course Code is required",
    }),
  });

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const handleSignIn = async (values) => {
    let { code } = values;
    code = code.replace(/\s+/g, "").toLowerCase();

    if (!coursesList[code]) {
      toast({
        variant: "destructive",
        title: `Invalid Course Code!`,
        description: "Please enter a valid course code",
      });
      return;
    }
    if (new Date(coursesList[code]?.expiryDate) < new Date()) {
      localStorage.setItem("courseExpired", true);
    }

    if (code) {
      await handleGoogleSignIn(code);
    }
  };

  const handleGoogleSignIn = async (code) => {
    setAuthChecking(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      if (result) {
        const user = result.user;
        const userEmail = user.email;
        const q = query(collection(db, "AuthorizedUsers"));
        const querySnapshot = await getDocs(q);
        const isAuthorized = querySnapshot.docs.some(
          (doc) => doc.data().email === userEmail
        );
        if (!isAuthorized) {
          await signOut(auth);
          await deleteUser(user);
          toast({
            variant: "destructive",
            title: `Unauthorized Email Address!`,
            description: "Please contact administrator",
          });
          navigate("/login");
        } else {
          localStorage.setItem("courseCode", code);
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error Logging in :", error);
      toast({
        variant: "destructive",
        title: `Login Error!`,
        description: "Please login after some time",
      });
      localStorage.removeItem("courseCode");
    } finally {
      setAuthChecking(false);
    }
  };

  if (authChecking) {
    return <Loading message={"Authenticating"} />;
  }

  if (user && !authChecking) {
    return <Session />;
  }

  return (
    <div className="flex w-full justify-center items-center h-screen">
      <Card className="w-[320px] md:w-[350px]">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-xl">Edu Portal</CardTitle>
          <CardDescription className="text-base">
            Instructor - Naveen Pn
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSignIn)}>
              <div className="grid w-full items-center gap-2">
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg" htmlFor="code">
                        Course Code
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          id="code"
                          placeholder="Enter your course code"
                          className="text-base py-3 h-10"
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.code?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
                <div className="flex mt-2">
                  <Button
                    type="submit"
                    className="text-base w-full h-10 py-5 m-auto"
                  >
                    Sign In with Google
                  </Button>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
