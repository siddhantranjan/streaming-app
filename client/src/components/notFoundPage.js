import { useNavigate } from "react-router-dom"
import { path } from "../constants/client-path";

export const NotFound = () => {
    const navigate = useNavigate();
    return (
        <section className="flex items-center h-full p-16 text-blue">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl text-yellow-light">
                        <span className="sr-only">Error</span>404
                    </h2>
                    <p className="text-2xl font-semibold md:text-3xl">Sorry, we couldn't find this page.</p>
                    <p className="mt-4 mb-8 text-blue text-opacity-70">But dont worry, you can find plenty of other things on our homepage.</p>
                    <button type="button" class="text-yellow-light bg-blue font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 cursor-pointer" onClick={() => navigate(path.DASHBOARD)}>Go To Homepage</button>
                </div>
            </div>
        </section>
    )
}