import { Line } from "../basic/line"

export const GoingLiveStepTwo = ({ setTitle, title }) => {
    return (
        <div>
            <ul class="flex flex-col space-y-4 p-5">
                <li>
                    <input type="radio" id="hosting-small" name="hosting" value="hosting-small" class="hidden peer" required />
                    <label for="hosting-small" class="inline-flex justify-between items-center py-10 md:py-12 w-full text-yellow-light rounded-lg border-4 border-yellow-light">
                        <div class="block mx-auto">
                            <div class="w-full text-3xl">Stream Title</div>
                        </div>
                    </label>
                </li>
                <Line />
                <li className="flex flex-col items-center">
                    <label for="hosting-big" class="inline-flex justify-between items-center py-2 md:py-5 w-full text-yellow-light">
                        <div class="block mx-auto">
                            <div>Set Your Video title</div>
                        </div>
                    </label>
                    <input type="text" id="title" className="bg-blue text-yellow-light border border-yellow-light rounded-lg text-base outline-none w-5/6 p-2.5 placeholder:text-blue" placeholder="title" onChange={({ target }) => setTitle(target.value)} value={title} required />
                </li>
            </ul>



        </div>
    )
}