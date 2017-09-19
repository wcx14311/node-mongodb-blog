(function($){
	$.fn.formCheck = function(callback){
		var isAccress=false;
		if(this.find('[required]').length<1){
			isAccress=true;
		}else {
			this.find('[required]').each(function(index, el) {
				var msg = $(el).attr('s-msg') ? $(el).attr('s-msg') : '';
				if( isNull( $(el).val() ) ){
					$(el).parent().addClass('has-error').removeClass('has-success').find('.ant-form-explain').text(msg);	
					isAccress = false;
				}else {
					$(el).parent().addClass('has-success').removeClass('has-error').find('.ant-form-explain').text('');
					isAccress = true;
				};
				$(el).on('input',function(event) {
					if( isNull( $(el).val() ) ) {
						isAccress = false;
					}else {
						$(el).parent().addClass('has-success').removeClass('has-error').find('.ant-form-explain').text('');
						isAccress = true;
					}
				}).blur(function(){
					if( isNull( $(el).val() ) ) {
						$(el).parent().addClass('has-error').removeClass('has-success').find('.ant-form-explain').text(msg);
						isAccress = false;
					}else {
						$(el).parent().addClass('has-success').removeClass('has-error').find('.ant-form-explain').text('');
						isAccress = true;
					}
				})
			});
		}
		
		if(isAccress){
			callback()
		}
	}
	function isNull(data){ 
		return (data == "" || data == undefined || data == null) ? true : false; 
	}
}(jQuery||Zepto));