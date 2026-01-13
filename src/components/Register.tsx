import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";
import { SearchCode } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

const Register = () => {
    return (
        <div className="h-dvh">
            <div className="h-full flex justify-center items-center h-minus-header">
                <form onSubmit={() => {}} className="w-full max-w-sm">
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
                                    <Label htmlFor="name">
                                        Name <span className="text-red-700">*</span>
                                    </Label>
                                    <Input type="text" placeholder="john doe" />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">
                                        Email <span className="text-red-700">*</span>
                                    </Label>
                                    <Input type="email" placeholder="email@gmail.com" />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="password">
                                            Password <span className="text-red-700">*</span>
                                        </Label>
                                    </div>
                                    <Input type="password" placeholder="********" />
                                </div>
                                <div className="grid gap-2">
                                    <div className="flex items-center">
                                        <Label htmlFor="con-password">
                                            Confirm Password <span className="text-red-700">*</span>
                                        </Label>
                                    </div>
                                    <Input type="password" placeholder="********" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col gap-2">
                            <Button disabled={false} type="submit" className="w-full hover:cursor-pointer">
                                {false && <Spinner />} Submit
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
