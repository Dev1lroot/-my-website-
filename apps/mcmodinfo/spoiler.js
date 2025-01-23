function spoil(t) {
	$(t).parent('.title').parent('.head').parent('.spoiler').find('.content').first().toggle('slow');
	if ( t.value == '▲' ) { t.value = '▼'; } else { t.value = '▲'; };
}
class Spoiler
{
	constructor(id,title){
		this.id = id;
		this.title = title;
		this.content = "";
	}
	append(html){
		this.content += html;
	}
	parse(){
		var sp = '';
		sp += '<div class="spoiler">';
		sp += '	 <div class="head">'
		sp += '    <div class="title">';
		sp += '		 <strong>'+this.title+'</strong>';
		sp += '		 <input type="button" value="▼" onclick="spoil(this)"/>';
		sp += '    </div>';
		sp += '	   <div class="content" id="'+this.id+'" style="display: none;">';
		sp += '      '+this.content+'';
		sp += '	   </div></div>';
		sp += '</div>';
		return sp;
	}
}