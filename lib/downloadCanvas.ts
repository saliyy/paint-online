export function downloadCanvas(canvas: HTMLCanvasElement){
    let image = canvas.toDataURL();

    let tmpLink = document.createElement( 'a' );
    tmpLink.download = 'paint-online.png';
    tmpLink.href = image;

    document.body.appendChild( tmpLink );
    tmpLink.click();
    document.body.removeChild( tmpLink );
}
