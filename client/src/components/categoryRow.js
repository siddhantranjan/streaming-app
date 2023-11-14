import { CategoryThumbnail } from './thumbnail/categoryThumbnail'

export const CategoryRow = ({ categoryImages }) => {
    return (
        <div className="flex flex-row justify-center space-x-4 items-center w-full">
            {
                categoryImages.length ? (categoryImages.map((categoryImage, i) => (
                    <CategoryThumbnail imgSrc={categoryImage} />
                ))) : (<div></div>)
            }
        </div>
    )
}