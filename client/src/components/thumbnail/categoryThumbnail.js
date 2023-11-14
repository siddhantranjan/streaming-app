export function CategoryThumbnail({ changeTitle, imgSrc = "https://mdbootstrap.com/img/new/standard/city/047.jpg" }) {
    return (
        <div className="basis-1/4 cursor-pointer" onClick={event => changeTitle('workig form title change')}>
            <img src={imgSrc} className="max-w-full h-auto object-scale-down rounded-lg" alt="" />
        </div>
    )
}