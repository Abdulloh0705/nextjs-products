type Props = {
    params : Promise<{ productId: string}>
}
export default async function ReviewsPage({params}: Props) {
    const { productId } = await params
    return <h2>Reviews for product {productId}</h2>
}