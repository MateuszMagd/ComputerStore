// THIS FILE IS JUST FOR ME TO REMEMBER SOME PART OF CODE JUST TO CLEAN OTHER FILES
// THIS IS NOT A FUNCTIONAL COMPONENT


/*
const ItemCard: React.FC = async () => {
    const imageDirectory = path.join(process.cwd(), '/public/products');
    const imageFilenames = await fs.readdir(imageDirectory)
    console.log(imageFilenames);
    const string: string = "Hello/To/Ja";

    return (
        <div>
            <div>
                <ProcesorCard images={imageFilenames} />
            </div>
            {string.split('/').map((el:string) => <>{el} </>)}
        </div>
    );
};

const ProcesorCard: React.FC = ({ images }: { images: Array<string>; }) => {
    return <div>
        {images.map((el: string) => 
        <div>
            <Image  src={`/products/${el}`} key={el} alt={'alt'} width={500} height={500}/>
        </div>  
        )}
    </div>
}
*/