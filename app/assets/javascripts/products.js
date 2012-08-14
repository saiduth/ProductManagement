// Place all the behaviors and hooks related to the matching controller here.
// All this logic will automatically be available in application.js.
var page_number=2;
function paginate_store_items(p_no)
{
    var auth_token = $('meta[name="csrf-token"]').attr('content')
    if (p_no==0 && page_number>=2)
    {

      page_number=page_number-1;
    }
    else if(p_no==5)
    {
     page_number=page_number+1;
    }
    else
    {
      page_number=p_no;
    }
    $.ajax({
        type: "POST",
        url: "/products/paginate_items",
        data : {
            page_number:page_number,
            authenticity_token: auth_token
        },
        success: function(data, textStatus, jqXHR) {
            $("#wait").css("display", "block");
            $("#store-list").css("display", "none");
            if (data[0].length>0) {
                var list_string="";
                list_string='<tbody><tr>'+
                    '<th><span class="label label-inverse">Product Type</span></th>'+
                    '</tr>';

                for(var item=0;item<data[0].length;item++)
                {
                    if(data[1][item]=="Song")
                    {
                        list_string+='<tr>' +
                             '<td><span class="label label-success">'+data[1][item]+'</span></td>'+
                            '<td><span class="label label-info">'+data[0][item].name+'</span></td>' +
                            '<td><span class="label label-info">'+data[0][item].album+'</span></td>' +
                            '<td><span class="label label-info">'+data[0][item].artist+'</span></td>'+
                            '<td></td>'+
                            '</tr>';
                    }
                    else if(data[1][item]=="Book")
                    {
                        list_string+='<tr>'+
                            '<td><span class="label label-success">'+data[1][item]+'</span></td>'+
                            '<td><span class="label label-info">'+data[0][item].title+'</span></td>'+
                            '<td><span class="label label-info">'+data[0][item].author+'</span></td>'+
                            '<td><span class="label label-info">'+data[0][item].description+'</span></td>'+
                            '<td><span class="label label-info">'+data[0][item].price+'</span></td>'+
                            '</tr>';
                    }
                    else if(data[1][item]=="Camera")
                    {
                        list_string+='<tr>'+
                            '<td><span class="label label-success">'+data[1][item]+'</span></td>'+
                            '<td><span class="label label-info">'+data[0][item].model+'</span></td>'+
                            '<td><span class="label label-info">'+data[0][item].make+'</span></td>'+
                            '<td><span class="label label-info">'+data[0][item].price+'</span></td>'+
                            '<td></td>'+
                            '</tr>';
                    }

                }
                    list_string+='</tbody>';
             $("#store-list").empty();
             $("#store-list").append(list_string);
             $("#store-list").css("display", "table");
             $("#wait").css("display", "none");
             $(".pagination li").removeClass("active");
            $("#page"+p_no).addClass("active");
            }
            else
            {
                list_string='<tbody><tr>'+
                    '<td><span class="label label-notice">End of the store items</span></td>'+
                    '</tr></tbody>';

                 $("#store-list").empty();
             $("#store-list").append(list_string);
             $("#store-list").css("display", "table");
             $("#wait").css("display", "none");
            }

        },
        error: function(jqXHR, textStatus, errorThrown) {
        },
        complete: function(jqXHR, textStatus) {

        }
    });
}