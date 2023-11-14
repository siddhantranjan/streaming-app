import { Line } from "../basic/line"

export const GoingLiveStepOne = ({setCurrentPlatform}) => {
    return (
        <div>
            <ul class="flex flex-col space-y-4 p-5">
                <li>
                    <input type="radio" id="STREAMING" name="platform" value="STREAMING" class="hidden peer" required onChange={setCurrentPlatform}/>
                    <label for="STREAMING" class="inline-flex justify-between items-center py-10 md:py-12 w-full text-yellow-light rounded-lg border-4 border-blue cursor-pointer peer-checked:bg-yellow-light peer-checked:border-yellow-light peer-checked:text-blue hover:border-yellow-light">
                        <div class="block mx-auto">
                            <div class="w-full text-3xl">Streaming</div>
                        </div>
                    </label>
                </li>
                <Line />
                <li>
                    <input type="radio" id="WEBCAM" name="platform" value="WEBCAM" class="hidden peer" onChange={setCurrentPlatform}/>
                    <label for="WEBCAM" class="inline-flex justify-between items-center py-10 md:py-12 w-full text-yellow-light rounded-lg border-4 border-blue cursor-pointer peer-checked:bg-yellow-light peer-checked:border-yellow-light peer-checked:text-blue hover:border-yellow-light">
                        <div class="block mx-auto">
                            <div class="w-full text-3xl">WebCam</div>
                        </div>
                    </label>
                </li>
            </ul>



        </div>
    )
}