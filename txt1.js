var a=555;

!function add(){
    a+=a;
    return;
}()

console.log(a)