export async function GET() {
    return Response.json;
}
 
export async function HEAD() {
    return Response.json;
}
 
export async function POST() {
    return Response.json;
}
 
export async function PUT() {
    return Response.json;
}
 
export async function DELETE() {
    return Response.json;
}
 
export async function PATCH() {
    return Response.json;
}
 
// If `OPTIONS` is not defined, Next.js will automatically implement `OPTIONS` and set the appropriate Response `Allow` header depending on the other methods defined in the Route Handler.
export async function OPTIONS() {
    return Response.json;
}