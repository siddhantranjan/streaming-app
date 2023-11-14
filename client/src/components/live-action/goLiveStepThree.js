import { Line } from "../basic/line"

export const GoingLiveStepThree = ({stream_key}) => {
    return (
        <div>
            <ul class="flex flex-col space-y-4 p-5">
                <li>
                    <input type="radio" id="hosting-small" name="hosting" value="hosting-small" class="hidden peer" required />
                    <label for="hosting-small" class="inline-flex justify-between items-center py-10 md:py-12 w-full text-yellow-light rounded-lg border-4 border-yellow-light">
                        <div class="block mx-auto">
                            <div class="w-full text-3xl">Stream Key</div>
                        </div>
                    </label>
                </li>
                <Line />
                <li>
                    <input type="radio" id="hosting-big" name="hosting" value="hosting-big" class="hidden peer" />
                    <label for="hosting-big" class="inline-flex justify-between items-center py-10 md:py-12 w-full text-yellow-light">
                        <div class="block mx-auto">
                            <div class="w-full text-3xl text-center">{stream_key}</div>
                            <div>Use Your Streaming App To Go Live</div>
                        </div>
                    </label>
                </li>
            </ul>



        </div>
    )
}