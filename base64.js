var base64=(function(){
  var Base64Code='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/',
      indexOf=function(arr,str){
        if(!Array.indexOf){
          for(var i=0,l=arr.length;i<l;i++){
            if(str==arr[i]){
              return i;
            }
          }
          return -1;
        }else{
          return arr.indexOf(str);
        }
      },
      group=function(str){
        var arr=str.split(''),
            l=arr.length,
            n=(l/4)|0,
            i=0,
            u=(l%4)?(n+1):n,
            temp,
            result=[];
        while(i<u){
          temp=arr.splice(0,4);
          result.push(temp.join(''));
          i++;
        }
        return result;
      };
  return {
    encode:function(str){
      var i=0,
          l=str.length,
          code,
          n,
          p,
          result='';
      while(i<l){
        code=str.charCodeAt(i);
        n=(i+1)%3;
        switch(n){
          case 1:(
            result+=(Base64Code.charAt(code>>2))
          );break;
          case 2:(
            result+=(
              Base64Code.charAt(
                ((p&3)<<4)|(code>>4)
              )
            )
          );break;
          case 0:(
            result+=(
              Base64Code.charAt(
                ((p&0x0f)<<2)|(code>>6)
              )
            ),
            result+=(
              Base64Code.charAt(
                code&0x3f
              )
            )
          );break;
          default:break;
        }
        p=code;
        i+=1;
      }
      (n===1)&&(
        result+=(
          Base64Code.charAt(
            p&3<<4
          )
        ),
        result+='=='
      );
      (n===2)&&(
        result+=(
          Base64Code.charAt(
            (p&0x0f)<<2
          )
        ),
        result+='='
      );
      return result;
    },
    decode:function(str){
      str=str.replace(/\s|=/g,'');
      var i=0,
          strArr=group(str),
          l=strArr.length,
          arr=Base64Code.split(''),
          code,
          n,
          p,
          j,
          k,
          result='';
      while(i<l){
        k=strArr[i].length;
        if(k==4){
          j=0;
          while(j<k){ 
            code=indexOf(arr,strArr[i].charAt(j));
            n=(j+1)%3;
            if(j>0){
              switch(n){
                case 2:
                  result+=(String.fromCharCode(p << 2 | code >> 4));
                break;
                case 0:
                  result+=(String.fromCharCode((p & 0x0f) << 4 | code >> 2));
                break;
                case 1:
                  result+=(String.fromCharCode((p & 3) << 6 | code));
                break;
              }
            }
            p=code;
            j+=1;
          }
        }else{
          j=0;
          while(j<k){
            code=indexOf(arr,strArr[i].charAt(j));
            n=(j+1)%3;
            if(j>0){
              switch(n){
                case 2:
                  result+=(String.fromCharCode((p<<2 | code >> 4)));
                break;
                case 0:
                 result+=(String.fromCharCode(((p&0x0f) << 4 | code >> 2)));
                break;
              }
            }
            p=code;
            j+=1;
          }
        }
        i+=1;
      }
      return result; 
    }
  };
}());
