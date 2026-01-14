import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const CreateBlogDialog = () => {
    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>Add</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Create new blog</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={() => {}} className="w-full max-w-sm">
                        <div className="grid gap-2">
                            <div>
                                <Label htmlFor="title">
                                    Title <span className="text-red-700 mb-2">*</span>
                                </Label>
                                <Input type="title" placeholder="blog" />
                            </div>

                            <div>
                                <Label htmlFor="blog">
                                    Blog <span className="text-red-700 mb-2">*</span>
                                </Label>
                                <Textarea placeholder="Type your message blog." />
                            </div>
                        </div>
                    </form>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default CreateBlogDialog;
