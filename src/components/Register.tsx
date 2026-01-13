import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router";
import { SearchCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { registerSchema } from "@/lib/validators";
import { registerDefaultValues } from "@/lib/constants";
import { z } from "zod";
import { supabase } from "@/lib/supabase";

const Register = () => {
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: registerDefaultValues,
    });

    const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (fields) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email: fields.email,
                password: fields.password,
                options: {
                    emailRedirectTo: "/my-blogs",
                },
            });

            if (error) {
                throw new Error(error.message);
            }

            // to do, add user and session to redux
            navigate("/");
        } catch (err) {
            console.log(err);
            if (err instanceof Error) {
                setError("root", { message: err.message });
            } else {
                setError("root", { message: "Something went wrong" });
            }
        }
    };
    return (
        <div className="h-dvh">
            <div className="h-full flex justify-center items-center h-minus-header">
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm">
                    <Card>
                        <CardHeader className="space-y-2 place-items-center">
                            <Link to="/" className="hover:cursor-pointer">
                                <SearchCode className="w-18 h-18 m-0 text-yellow-500" />
                            </Link>
                            <CardTitle className="text-center text-2xl">Register</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-6">
                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        Email <span className="text-red-700">*</span>
                                    </Label>
                                    <Input {...register("email")} type="email" placeholder="email@gmail.com" />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password <span className="text-red-700">*</span>
                                        </Label>
                                    </div>
                                    <Input {...register("password")} type="password" placeholder="********" />
                                    {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="confirmPassword">
                                            Confirm Password <span className="text-red-700">*</span>
                                        </Label>
                                    </div>
                                    <Input {...register("confirmPassword")} type="password" placeholder="********" />

                                    {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                                </div>
                                {errors.root && <div className="text-sm text-destructive">{errors.root.message}</div>}
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button disabled={false} type="submit" className="w-full hover:cursor-pointer">
                                {isSubmitting && <Spinner />} Submit
                            </Button>

                            <Link to="/login" className="text-sm text-center text-muted-foreground">
                                Already have an account? <span className="text-yellow-500 font-bold">Login</span>
                            </Link>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </div>
    );
};

export default Register;
