import Image from 'next/image'
const image = "/images/igel.png"
export default function Custom404() {
    return (<>
    <h1>404 - Page Not Found</h1>
            <Image
                priority
                src={image}
                layout="fill"
                alt="error"
                />
                </>
            )
  }