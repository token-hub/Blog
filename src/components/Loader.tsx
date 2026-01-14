import { Spinner } from "@/components/ui/spinner";

const Loader = () => {
    return (
        <div className="flex justify-center items-center h-11/12">
            <Spinner />
        </div>
    );
};

export default Loader;
