var Custom="Custom",GoogleCheckout="GoogleCheckout",PayPal="PayPal",Email="Email",AustralianDollar="AUD",AUD="AUD",CanadianDollar="CAD",CAD="CAD",CzechKoruna="CZK",CZK="CZK",DanishKrone="DKK",DKK="DKK",Euro="EUR",EUR="EUR",HongKongDollar="HKD",HKD="HKD",HungarianForint="HUF",HUF="HUF",IsraeliNewSheqel="ILS",ILS="ILS",JapaneseYen="JPY",JPY="JPY",MexicanPeso="MXN",MXN="MXN",NorwegianKrone="NOK",NOK="NOK",NewZealandDollar="NZD",NZD="NZD",PolishZloty="PLN",PLN="PLN",PoundSterling="GBP",GBP="GBP",SingaporeDollar="SGD",SGD="SGD",SwedishKrona="SEK",SEK="SEK",SwissFranc="CHF",CHF="CHF",ThaiBaht="THB",THB="THB",IndonesianRupiah="IDR",IDR="IDR",USDollar="USD",USD="USD";function Cart(){var me=this;me.nextId=1;me.Version='2.2.2';me.Shelf=null;me.items={};me.isLoaded=false;me.pageIsReady=false;me.quantity=0;me.total=0;me.taxRate=0;me.taxCost=0;me.shippingFlatRate=0;me.shippingTotalRate=0;me.shippingQuantityRate=0;me.shippingRate=0;me.shippingCost=0;me.currency=USD;me.checkoutTo=PayPal;me.email="";me.merchantId="";me.successUrl=null;me.cancelUrl=null;me.cookieDuration=30;me.storagePrefix="sc_";me.MAX_COOKIE_SIZE=4000;me.cartHeaders=['Name','Price','Quantity','Total'];me.events={};me.sandbox=false;me.paypalHTTPMethod="GET";me.add=function(values){var me=this;if(!me.pageIsReady){me.initializeView();me.update();}
if(!me.isLoaded){me.load();me.update();}
var newItem=new CartItem();if(!arguments||arguments.length===0){error('No values passed for item.');return null;}
var argumentArray=arguments;if(values&&typeof(values)!=='string'&&typeof(values)!=='number'){argumentArray=values;}
newItem.parseValuesFromArray(argumentArray);newItem.checkQuantityAndPrice();if(me.trigger('beforeAdd',[newItem])===false){return false;}
var isNew=true;if(me.hasItem(newItem)){var foundItem=me.hasItem(newItem);foundItem.quantity=parseInt(foundItem.quantity,10)+ parseInt(newItem.quantity,10);newItem=foundItem;isNew=false;}else{me.items[newItem.id]=newItem;}
me.update();me.trigger('afterAdd',[newItem,isNew]);return newItem;};me.remove=function(id){var tempArray={};me.each(function(item){if(item.id!==id){tempArray[item.id]=item;}});this.items=tempArray;};me.empty=function(){me.items={};me.update();};me.find=function(criteria){if(!criteria){return null;}
var results=[];me.each(function(item,x,next){fits=true;me.each(criteria,function(value,j,name){if(!item[name]||item[name]!=value){fits=false;}});if(fits){results.push(item);}});return(results.length===0)?null:results;};me.each=function(array,callback){var next,x=0,result;if(typeof array==='function'){var cb=array
items=me.items;}else if(typeof callback==='function'){var cb=callback,items=array;}else{return;}
for(next in items){if(typeof items[next]!=="function"){result=cb.call(me,items[next],x,next);if(result===false){return;}
x++;}}};me.chunk=function(str,n){if(typeof n==='undefined'){n=2;}
var result=str.match(RegExp('.{1,'+n+'}','g'));return result||[];};me.checkout=function(){if(me.quantity===0){error("Keranjang masih kosong");return;}
switch(me.checkoutTo){case PayPal:me.paypalCheckout();break;case GoogleCheckout:me.googleCheckout();break;case Email:me.emailCheckout();break;default:me.customCheckout();break;}};me.paypalCheckout=function(){var form=document.createElement("form"),counter=1,current,item,descriptionString;form.style.display="none";form.method=me.paypalHTTPMethod=="GET"||me.paypalHTTPMethod=="POST"?me.paypalHTTPMethod:"GET";form.action=me.sandbox?"https://www.sandbox.paypal.com/cgi-bin/webscr":"https://www.paypal.com/cgi-bin/webscr";form.acceptCharset="utf-8";form.appendChild(me.createHiddenElement("cmd","_cart"));form.appendChild(me.createHiddenElement("rm",me.paypalHTTPMethod=="POST"?"2":"0"));form.appendChild(me.createHiddenElement("upload","1"));form.appendChild(me.createHiddenElement("business",me.email));form.appendChild(me.createHiddenElement("currency_code","me.currency"));if(me.taxRate){form.appendChild(me.createHiddenElement("tax_cart",me.taxCost));}
if(me.shipping()!==0){form.appendChild(me.createHiddenElement("handling_cart",me.shippingCost));}
if(me.successUrl){form.appendChild(me.createHiddenElement("return",me.successUrl));}
if(me.cancelUrl){form.appendChild(me.createHiddenElement("cancel_return",me.cancelUrl));}
me.each(function(item,iter){counter=iter+1;form.appendChild(me.createHiddenElement("item_name_"+ counter,item.name));form.appendChild(me.createHiddenElement("quantity_"+ counter,item.quantity));form.appendChild(me.createHiddenElement("amount_"+ counter,item.price));form.appendChild(me.createHiddenElement("item_number_"+ counter,counter));var option_count=0;me.each(item,function(value,x,field){if(field!=="id"&&field!=="price"&&field!=="quantity"&&field!=="name"&&field!=="shipping"&&option_count<10){form.appendChild(me.createHiddenElement("on"+ option_count+"_"+ counter,field));form.appendChild(me.createHiddenElement("os"+ option_count+"_"+ counter,value));option_count++;}});form.appendChild(me.createHiddenElement("option_index_"+ counter,option_count));});document.body.appendChild(form);form.submit();document.body.removeChild(form);};me.googleCheckout=function(){var me=this;if(me.currency!==USD&&me.currency!==GBP){error("Google Checkout only allows the USD and GBP for currency.");return;}else if(me.merchantId===""||me.merchantId===null||!me.merchantId){error("No merchant Id for google checkout supplied.");return;}
var form=document.createElement("form"),counter=1,current,item,descriptionString;form.style.display="none";form.method="POST";form.action="https://checkout.google.com/api/checkout/v2/checkoutForm/Merchant/"+
me.merchantId;form.acceptCharset="utf-8";me.each(function(item,iter){counter=iter+1;form.appendChild(me.createHiddenElement("item_name_"+ counter,item.name));form.appendChild(me.createHiddenElement("item_quantity_"+ counter,item.quantity));form.appendChild(me.createHiddenElement("item_price_"+ counter,item.price));form.appendChild(me.createHiddenElement("item_currency_"+ counter,me.currency));form.appendChild(me.createHiddenElement("item_tax_rate_"+ counter,me.taxRate));form.appendChild(me.createHiddenElement("_charset_",""));descriptionString="";me.each(item,function(value,x,field){if(field!=="id"&&field!=="quantity"&&field!=="price"){descriptionString=descriptionString+", "+ field+": "+ value;}});descriptionString=descriptionString.substring(1);form.appendChild(me.createHiddenElement("item_description_"+ counter,descriptionString));});if(me.shipping()!==0){form.appendChild(me.createHiddenElement("ship_method_name_1","Shipping"));form.appendChild(me.createHiddenElement("ship_method_price_1",parseFloat(me.shippingCost).toFixed(2)));form.appendChild(me.createHiddenElement("ship_method_currency_1",me.currency));}
document.body.appendChild(form);form.submit();document.body.removeChild(form);};me.emailCheckout=function(){return;};me.customCheckout=function(){return;};me.load=function(){var me=this,id;me.items={};me.total=0.00;me.quantity=0;if(readCookie(simpleCart.storagePrefix+'simpleCart_'+"chunks")){var chunkCount=1*readCookie(simpleCart.storagePrefix+'simpleCart_'+"chunks"),dataArray=[],dataString="",data="",info,newItem,y=0;if(chunkCount>0){for(y=0;y<chunkCount;y++){dataArray.push(readCookie(simpleCart.storagePrefix+'simpleCart_'+(1+ y)));}
dataString=unescape(dataArray.join(""));data=dataString.split("++");}
for(var x=0,xlen=data.length;x<xlen;x++){info=data[x].split('||');newItem=new CartItem();if(newItem.parseValuesFromArray(info)){newItem.checkQuantityAndPrice();me.items[newItem.id]=newItem;}}}
me.isLoaded=true;};me.save=function(){var dataString="",dataArray=[],chunkCount=0;chunkCount=1*readCookie(simpleCart.storagePrefix+'simpleCart_'+"chunks");for(var j=0;j<chunkCount;j++){eraseCookie(simpleCart.storagePrefix+'simpleCart_'+ j);}
eraseCookie(simpleCart.storagePrefix+'simpleCart_'+"chunks");me.each(function(item){dataString=dataString+"++"+ item.print();});dataArray=simpleCart.chunk(dataString.substring(2),simpleCart.MAX_COOKIE_SIZE);for(var x=0,xlen=dataArray.length;x<xlen;x++){createCookie(simpleCart.storagePrefix+'simpleCart_'+(1+ x),dataArray[x],me.cookieDuration);}
createCookie(simpleCart.storagePrefix+'simpleCart_'+"chunks",""+ dataArray.length,me.cookieDuration);};me.initializeView=function(){var me=this;me.totalOutlets=getElementsByClassName('simpleCart_total');me.quantityOutlets=getElementsByClassName('simpleCart_quantity');me.cartDivs=getElementsByClassName('simpleCart_items');me.taxCostOutlets=getElementsByClassName('simpleCart_taxCost');me.taxRateOutlets=getElementsByClassName('simpleCart_taxRate');me.shippingCostOutlets=getElementsByClassName('simpleCart_shippingCost');me.finalTotalOutlets=getElementsByClassName('simpleCart_finalTotal');me.addEventToArray(getElementsByClassName('simpleCart_checkout'),simpleCart.checkout,"click");me.addEventToArray(getElementsByClassName('simpleCart_empty'),simpleCart.empty,"click");me.Shelf=new Shelf();me.Shelf.readPage();me.pageIsReady=true;};me.updateView=function(){me.updateViewTotals();if(me.cartDivs&&me.cartDivs.length>0){me.updateCartView();}};me.updateViewTotals=function(){var outlets=[["quantity","none"],["total","currency"],["shippingCost","currency"],["taxCost","currency"],["taxRate","percentage"],["finalTotal","currency"]];for(var x=0,xlen=outlets.length;x<xlen;x++){var arrayName=outlets[x][0]+"Outlets",outputString,element;for(var y=0,ylen=me[arrayName].length;y<ylen;y++){switch(outlets[x][1]){case"none":outputString=""+ me[outlets[x][0]];break;case"currency":outputString=me.valueToCurrencyString(me[outlets[x][0]]);break;case"percentage":outputString=me.valueToPercentageString(me[outlets[x][0]]);break;default:outputString=""+ me[outlets[x][0]];break;}
me[arrayName][y].innerHTML=""+ outputString;}}};me.updateCartView=function(){var newRows=[],y,newRow,current,header,newCell,info,outputValue,option,headerInfo;newRow=document.createElement('div');for(var y=0,ylen=me.cartHeaders.length;y<ylen;y++){newCell=document.createElement('div');headerInfo=me.cartHeaders[y].split("_");newCell.innerHTML=me.print(headerInfo[0]);newCell.className="item"+ headerInfo[0];for(var z=1,zlen=headerInfo.length;z<zlen;z++){if(headerInfo[z].toLowerCase()=="noheader"){newCell.style.display="none";}}
newRow.appendChild(newCell);}
newRow.className="cartHeaders";newRows[0]=newRow;me.each(function(item,x){newRow=document.createElement('div');for(var y=0,ylen=me.cartHeaders.length;y<ylen;y++){newCell=document.createElement('div');info=me.cartHeaders[y].split("_");outputValue=me.createCartRow(info,item,outputValue);newCell.innerHTML=outputValue;newCell.className="item"+ info[0];newRow.appendChild(newCell);}
newRow.className="itemContainer";newRows[x+1]=newRow;});for(var x=0,xlen=me.cartDivs.length;x<xlen;x++){var div=me.cartDivs[x];if(div.childNodes&&div.appendChild){while(div.childNodes[0]){div.removeChild(div.childNodes[0]);}
for(var j=0,jLen=newRows.length;j<jLen;j++){div.appendChild(newRows[j]);}}}};me.createCartRow=function(info,item,outputValue){switch(info[0].toLowerCase()){case"total":outputValue=me.valueToCurrencyString(parseFloat(item.price)*parseInt(item.quantity,10));break;case"increment":outputValue=me.valueToLink("+","javascript:;","onclick=\"simpleCart.items[\'"+ item.id+"\'].increment();\"");break;case"decrement":outputValue=me.valueToLink("-","javascript:;","onclick=\"simpleCart.items[\'"+ item.id+"\'].decrement();\"");break;case"remove":outputValue=me.valueToLink("Remove","javascript:;","onclick=\"simpleCart.items[\'"+ item.id+"\'].remove();\"");break;case"price":outputValue=me.valueToCurrencyString(item[info[0].toLowerCase()]?item[info[0].toLowerCase()]:" ");break;default:outputValue=item[info[0].toLowerCase()]?typeof item[info[0].toLowerCase()]==='function'?item[info[0].toLowerCase()].call(item):item[info[0].toLowerCase()]:" ";break;}
for(var y=1,ylen=info.length;y<ylen;y++){option=info[y].toLowerCase();switch(option){case"image":case"img":outputValue=me.valueToImageString(outputValue);break;case"input":outputValue=me.valueToTextInput(outputValue,"onchange=\"simpleCart.items[\'"+ item.id+"\'].set(\'"+ info[0].toLowerCase()+"\' , this.value);\"");break;case"div":case"span":case"h1":case"h2":case"h3":case"h4":case"p":outputValue=me.valueToElement(option,outputValue,"");break;case"noheader":break;default:error("unkown header option: "+ option);break;}}
return outputValue;};me.addEventToArray=function(array,functionCall,theEvent){var outlet,element;for(var x=0,xlen=array.length;x<xlen;x++){element=array[x];if(element.addEventListener){element.addEventListener(theEvent,functionCall,false);}else if(element.attachEvent){element.attachEvent("on"+ theEvent,functionCall);}}};me.createHiddenElement=function(name,value){var element=document.createElement("input");element.type="hidden";element.name=name;element.value=value;return element;};me.bind=function(name,callback){if(typeof callback!=='function'){return me;}
if(me.events[name]===true){callback.apply(me);}else if(typeof me.events[name]!=='undefined'){me.events[name].push(callback);}else{me.events[name]=[callback];}
return me;};me.trigger=function(name,options){var returnval=true;if(typeof me.events[name]!=='undefined'&&typeof me.events[name][0]==='function'){for(var x=0,xlen=me.events[name].length;x<xlen;x++){returnval=me.events[name][x].apply(me,(options?options:[]));}}
if(returnval===false){return false;}else{return true;}};me.ready=function(callback){if(!callback){me.trigger('ready');me.events['ready']=true;}else{me.bind('ready',callback);}
return me;};me.currencySymbol=function(){switch(me.currency){case CHF:return"CHF&nbsp;";case CZK:return"CZK&nbsp;";case DKK:return"DKK&nbsp;";case HUF:return"HUF&nbsp;";case NOK:return"NOK&nbsp;";case PLN:return"PLN&nbsp;";case SEK:return"SEK&nbsp;";case JPY:return"&yen;";case EUR:return"&euro;";case GBP:return"&pound;";case CHF:return"CHF&nbsp;";case THB:return"&#3647;";case DKK:return"Rp&nbsp;";case USD:case CAD:case AUD:case NZD:case HKD:case SGD:return"&#36;";default:return"";}};me.currencyStringForPaypalCheckout=function(value){if(me.currencySymbol()=="&#36;"){return"$"+ parseFloat(value).toFixed(2);}else{return""+ parseFloat(value).toFixed(2);}};me.valueToCurrencyString=function(value){var val=parseFloat(value);if(isNaN(val))
val=0;return val.toCurrency(me.currencySymbol());};me.valueToPercentageString=function(value){return parseFloat(100*value)+"%";};me.valueToImageString=function(value){if(value.match(/<\s*img.*src\=/)){return value;}else{return"<img src=\""+ value+"\" />";}};me.valueToTextInput=function(value,html){return"<input type=\"text\" value=\""+ value+"\" "+ html+" />";};me.valueToLink=function(value,link,html){return"<a href=\""+ link+"\" "+ html+" >"+ value+"</a>";};me.valueToElement=function(type,value,html){return"<"+ type+" "+ html+" > "+ value+"</"+ type+">";};me.hasItem=function(item){var current,matches,field,match=false;me.each(function(testItem){matches=true;me.each(item,function(value,x,field){if(field!=="quantity"&&field!=="id"&&item[field]!==testItem[field]){matches=false;}});if(matches){match=testItem;}});return match;};me.ln={"en_us":{quantity:"Quantity",price:"Price",total:"Total",decrement:"Decrement",increment:"Increment",remove:"Remove",tax:"Tax",shipping:"Shipping",image:"Image"}};me.language="en_us";me.print=function(input){var me=this;return me.ln[me.language]&&me.ln[me.language][input.toLowerCase()]?me.ln[me.language][input.toLowerCase()]:input;};me.update=function(){if(!simpleCart.isLoaded){simpleCart.load();}
if(!simpleCart.pageIsReady){simpleCart.initializeView();}
me.updateTotals();me.updateView();me.save();};me.updateTotals=function(){me.total=0;me.quantity=0;me.each(function(item){if(item.quantity<1){item.remove();}else if(item.quantity!==null&&item.quantity!=="undefined"){me.quantity=parseInt(me.quantity,10)+ parseInt(item.quantity,10);}
if(item.price){me.total=parseFloat(me.total)+ parseInt(item.quantity,10)*parseFloat(item.price);}});me.shippingCost=me.shipping();me.taxCost=parseFloat(me.total)*me.taxRate;me.finalTotal=me.shippingCost+ me.taxCost+ me.total;};me.shipping=function(){if(parseInt(me.quantity,10)===0)
return 0;var shipping=parseFloat(me.shippingFlatRate)+
parseFloat(me.shippingTotalRate)*parseFloat(me.total)+
parseFloat(me.shippingQuantityRate)*parseInt(me.quantity,10),next;me.each(function(nextItem){if(nextItem.shipping){if(typeof nextItem.shipping=='function'){shipping+=parseFloat(nextItem.shipping());}else{shipping+=parseFloat(nextItem.shipping);}}});return shipping;}
me.initialize=function(){me.initializeView();me.load();me.update();me.ready();};}
function CartItem(){while(simpleCart.items["c"+ simpleCart.nextId])
simpleCart.nextId++;this.id="c"+ simpleCart.nextId;}
CartItem.prototype={set:function(field,value){field=field.toLowerCase();if(typeof(this[field])!=="function"&&field!=="id"){value=""+ value;if(field=="quantity"){value=value.replace(/[^(\d|\.)]*/gi,"");value=value.replace(/,*/gi,"");value=parseInt(value,10);}else if(field=="price"){value=value.replace(/[^(\d|\.)]*/gi,"");value=value.replace(/,*/gi,"");value=parseFloat(value);}
if(typeof(value)=="number"&&isNaN(value)){error("Improperly formatted input.");}else{if(typeof(value)==="string"){if(value.match(/\~|\=/)){error("Special character ~ or = not allowed: "+ value);}
value=value.replace(/\~|\=/g,"");}
this[field]=value;this.checkQuantityAndPrice();}}else{error("Cannot change "+ field+", this is a reserved field.");}
simpleCart.update();},increment:function(){this.quantity=parseInt(this.quantity,10)+ 1;simpleCart.update();},decrement:function(){if(parseInt(this.quantity,10)<2){this.remove();}else{this.quantity=parseInt(this.quantity,10)- 1;simpleCart.update();}},print:function(){var returnString='',field;simpleCart.each(this,function(item,x,name){returnString+=escape(name)+"="+ escape(item)+"||";});return returnString.substring(0,returnString.length-2);},checkQuantityAndPrice:function(){if(!this.quantity||this.quantity==null||this.quantity=='undefined'){this.quantity=1;error('No quantity for item.');}else{this.quantity=(""+ this.quantity).replace(/,*/gi,"");this.quantity=parseInt((""+ this.quantity).replace(/[^(\d|\.)]*/gi,""),10);if(isNaN(this.quantity)){error('Quantity is not a number.');this.quantity=1;}}
if(!this.price||this.price==null||this.price=='undefined'){this.price=0.00;error('No price for item or price not properly formatted.');}else{this.price=(""+ this.price).replace(/,*/gi,"");this.price=parseFloat((""+ this.price).replace(/[^(\d|\.)]*/gi,""));if(isNaN(this.price)){error('Price is not a number.');this.price=0.00;}}},parseValuesFromArray:function(array){if(array&&array.length&&array.length>0){for(var x=0,xlen=array.length;x<xlen;x++){array[x]=array[x].replace(/\|\|/g,"| |");array[x]=array[x].replace(/\+\+/g,"+ +");if(array[x].match(/\~/)){error("Special character ~ not allowed: "+ array[x]);}
array[x]=array[x].replace(/\~/g,"");var value=array[x].split('=');if(value.length>1){if(value.length>2){for(var j=2,jlen=value.length;j<jlen;j++){value[1]=value[1]+"="+ value[j];}}
this[unescape(value[0]).toLowerCase()]=unescape(value[1]);}}
return true;}else{return false;}},remove:function(){simpleCart.remove(this.id);simpleCart.update();}};function Shelf(){this.items={};}
Shelf.prototype={readPage:function(){this.items={};var newItems=getElementsByClassName("simpleCart_shelfItem"),newItem;me=this;for(var x=0,xlen=newItems.length;x<xlen;x++){newItem=new ShelfItem();me.checkChildren(newItems[x],newItem);me.items[newItem.id]=newItem;}},checkChildren:function(item,newItem){if(!item.childNodes)
return;for(var x=0;item.childNodes[x];x++){var node=item.childNodes[x];if(node.className&&node.className.match(/item_[^ ]+/)){var data=/item_[^ ]+/.exec(node.className)[0].split("_");if(data[1]=="add"||data[1]=="Add"){var tempArray=[];tempArray.push(node);var addFunction=simpleCart.Shelf.addToCart(newItem.id);simpleCart.addEventToArray(tempArray,addFunction,"click");node.id=newItem.id;}else{newItem[data[1]]=node;}}
if(node.childNodes[0]){this.checkChildren(node,newItem);}}},empty:function(){this.items={};},addToCart:function(id){return function(){if(simpleCart.Shelf.items[id]){simpleCart.Shelf.items[id].addToCart();}else{error("Shelf item with id of "+ id+" does not exist.");}};}};function ShelfItem(){this.id="s"+ simpleCart.nextId++;}
ShelfItem.prototype={remove:function(){simpleCart.Shelf.items[this.id]=null;},addToCart:function(){var outStrings=[],valueString,field;for(field in this){if(typeof(this[field])!=="function"&&field!=="id"){valueString="";switch(field){case"price":if(this[field].value){valueString=this[field].value;}else if(this[field].innerHTML){valueString=this[field].innerHTML;}
valueString=valueString.replace(/[^(\d|\.)]*/gi,"");valueString=valueString.replace(/,*/,"");break;case"image":valueString=this[field].src;break;default:if(this[field].value){valueString=this[field].value;}else if(this[field].innerHTML){valueString=this[field].innerHTML;}else if(this[field].src){valueString=this[field].src;}else{valueString=this[field];}
break;}
outStrings.push(field+"="+ valueString);}}
simpleCart.add(outStrings);}};function createCookie(name,value,days){if(days){var date=new Date();date.setTime(date.getTime()+(days*24*60*60*1000));var expires="; expires="+date.toGMTString();}
else var expires="";value=value.replace(/\=/g,'~');document.cookie=name+"="+ escape(value)+ expires+"; path=/";}
function readCookie(name){var nameEQ=name+"=";var ca=document.cookie.split(';');for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==' ')c=c.substring(1,c.length);if(c.indexOf(nameEQ)===0){var value=unescape(c.substring(nameEQ.length,c.length));return value.replace(/\~/g,'=');}}
return null;}
function eraseCookie(name){createCookie(name,"",-1);}
var getElementsByClassName=function(className,tag,elm){if(document.getElementsByClassName){getElementsByClassName=function(className,tag,elm){elm=elm||document;var elements=elm.getElementsByClassName(className),nodeName=(tag)?new RegExp("\\b"+ tag+"\\b","i"):null,returnElements=[],current;for(var i=0,il=elements.length;i<il;i+=1){current=elements[i];if(!nodeName||nodeName.test(current.nodeName)){returnElements.push(current);}}
return returnElements;};}
else if(document.evaluate){getElementsByClassName=function(className,tag,elm){tag=tag||"*";elm=elm||document;var classes=className.split(" "),classesToCheck="",xhtmlNamespace="http://www.w3.org/1999/xhtml",namespaceResolver=(document.documentElement.namespaceURI===xhtmlNamespace)?xhtmlNamespace:null,returnElements=[],elements,node;for(var j=0,jl=classes.length;j<jl;j+=1){classesToCheck+="[contains(concat(' ', @class, ' '), ' "+ classes[j]+" ')]";}
try{elements=document.evaluate(".//"+ tag+ classesToCheck,elm,namespaceResolver,0,null);}
catch(e){elements=document.evaluate(".//"+ tag+ classesToCheck,elm,null,0,null);}
while((node=elements.iterateNext())){returnElements.push(node);}
return returnElements;};}
else{getElementsByClassName=function(className,tag,elm){tag=tag||"*";elm=elm||document;var classes=className.split(" "),classesToCheck=[],elements=(tag==="*"&&elm.all)?elm.all:elm.getElementsByTagName(tag),current,returnElements=[],match;for(var k=0,kl=classes.length;k<kl;k+=1){classesToCheck.push(new RegExp("(^|\\s)"+ classes[k]+"(\\s|$)"));}
for(var l=0,ll=elements.length;l<ll;l+=1){current=elements[l];match=false;for(var m=0,ml=classesToCheck.length;m<ml;m+=1){match=classesToCheck[m].test(current.className);if(!match){break;}}
if(match){returnElements.push(current);}}
return returnElements;};}
return getElementsByClassName(className,tag,elm);};String.prototype.reverse=function(){return this.split("").reverse().join("");};Number.prototype.withCommas=function(){var x=6,y=parseFloat(this).toFixed(2).toString().reverse();while(x<y.length){y=y.substring(0,x)+","+y.substring(x);x+=4;}return y.reverse();};Number.prototype.toCurrency=function(){return(arguments[0]?arguments[0]:"$")+this.withCommas();};function error(message){try{console.log(message);}catch(err){}}
var simpleCart=new Cart();if(typeof jQuery!=='undefined')$(document).ready(function(){simpleCart.initialize();});else if(typeof Prototype!=='undefined')Event.observe(window,'load',function(){simpleCart.initialize();});else window.onload=simpleCart.initialize;
