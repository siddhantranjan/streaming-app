import SendIcon from '@mui/icons-material/Send';

export function Comment() {
    return (
        <div className="flex flex-col items-center mx-10 p-2 lg:mx-2 lg:w-1/4 lg:h-full lg:fixed lg:top-0 lg:right-0">
                    <div className="w-full lg:fixed lg:bottom-0 lg:w-1/4">
                        <form>
                            <div className="flex items-center py-2 px-3 bg-gray-50 rounded-lg dark:bg-gray-700">
                                <textarea className="block mx-4 p-2.5 w-full text-sm text-gray-900 bg-white" placeholder="Your message..."></textarea>
                                <button type="submit" className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer">
                                    <SendIcon />
                                    <span className="sr-only">Send message</span>
                                </button>
                            </div>
                        </form>
                    </div>
                    
                    <div className="w-full h-96 flex flex-col overflow-y-scroll scrollbar space-y-4 text-xs lg:text-sm lg:flex-col-reverse lg:h-3/4 lg:mt-20">
                        <div className="flex flex-row space-x-3">
                            <span>Matlabi</span>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </span>
                        </div>

                        <div className="flex flex-row space-x-3">
                            <span>Matlabi</span>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </span>
                        </div>

                        <div className="flex flex-row space-x-3">
                            <span>Matlabi</span>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </span>
                        </div>

                        <div className="flex flex-row space-x-3">
                            <span>Matlabi</span>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </span>
                        </div>

                        <div className="flex flex-row space-x-3">
                            <span>Matlabi</span>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </span>
                        </div>

                        <div className="flex flex-row space-x-3">
                            <span>Matlabi</span>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </span>
                        </div>

                        <div className="flex flex-row space-x-3">
                            <span>Matlabi</span>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </span>
                        </div>

                        <div className="flex flex-row space-x-3">
                            <span>Matlabi</span>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </span>
                        </div>

                        <div className="flex flex-row space-x-3">
                            <span>Matlabi</span>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </span>
                        </div>

                        <div className="flex flex-row space-x-3">
                            <span>Matlabi</span>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </span>
                        </div>

                        <div className="flex flex-row space-x-3">
                            <span>Matlabi</span>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </span>
                        </div>

                        <div className="flex flex-row space-x-3">
                            <span>Matlabi</span>
                            <span>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
                            </span>
                        </div>
                    </div>
                </div>
    )
}