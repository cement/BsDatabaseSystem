
    var filds = [],
        priKey=undefined;
        prindex=undefined;
        orgFilds = [];
        dbName = '';
        tableName = '';
        alias ='';


    function curdClick(event) {

        var parent = event.delegateTarget.parentElement;
        var rowIndex = parent.rowIndex;
        var option = $(event.target).text();


        switch (option) {
            case '增加':
                if (!$(event.target).hasClass('newRow')) {
                    //event.target.confirmed=true;

                    var newtrow = $('<tr></tr>');
                    var innerHtml ='';
                    for (var k = 0; k < filds.length; k++) {
                        if(priKey===filds[i]){
                            innerHtml += '<td class="prikey"><p contentEditable=false></p></td>';
                        }else{

                            innerHtml += '<td><p contentEditable=true></p></td>';
                        }
                    }

                    newtrow.html(innerHtml);
                    var curd = $('<td class="option">' +
                        '<a href=""  class="newRow">增加</a>' +
                        '<a href="javascript:volid(0);" hidden="hidden" style="opacity: 0.2" onclick="return false;">更新</a>' +
                        '<a href="">删除</a>' +
                        '</td>');
                    newtrow.append(curd);
                    $(parent).before(newtrow);

                    curd.on('click', 'a', function(event) {
                        event.preventDefault();
                        // e.stopPropagation();
                        curdClick(event);

                    })
                } else {
                    $(event.target).removeClass('newRow');
                    //var unique ={};
                    var tds = $(parent).children('td');

                    // var unique = {};
                    // var uniqueFild = orgFilds[prindex];
                    // var uniqeKey = tds.eq(prindex).text();
                    // unique[uniqueFild] = uniqeKey;
                    // unique[orgFilds[0]]=tds.eq(0).text();
                    var params = {};
                    var empty = true;

                    for (var i = 0; i < orgFilds.length; i++) {
                        if (i !== prindex) {
                            var text = tds.eq(i).text();
                            params[orgFilds[i]] = text;
                            if(empty){
                                if(text) empty =false;
                            }
                        }

                    }
                    if(empty){
                        $(parent).remove();
                        alert('增加数据不能全为空！');
                        return;
                    }
                    var info = [tableName, params];
                    var json = JSON.stringify(info);
                    console.log(json);
                    $.ajax({
                        url: "http://127.0.0.1:5757/api/insert",
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        //data: {a:'aa',b:'bb'},
                        //headers:{'content-length',''}
                        data: json,
                        //content-length:JSON.stringify(params).length,
                        dataType: "json",
                        success: function(result) {
                            console.log(result);
                            $(event.target).removeClass('newRow');
                            // $(event.target).css('color', '');
                            $(parent).css('background-color', '');
                            for (var i = 0; i < orgFilds.length; i++) {
                                if(i!==prindex)
                                tds.eq(i).find('p').attr('contentEditAble', false);
                            }
                            if (result.affectedRows > 0) {

                                alert('添加记录 ' + result.affectedRows + ' 条成功！');
                            } else {
                                alert('添加记录未成功！');
                            }
                        },
                        error: function(e) {
                            console.log(e);
                            $(event.target).removeClass('newRow');
                            //$(event.target).css('color', '');
                            $(parent).css('background-color', '');
                            for (var i = 1; i < orgFilds.length; i++) {
                                cells.eq(i).find('p').attr('contentEditAble', false);
                            }
                            alert('添加记录失败！');
                        }
                    });
                }
                //$(event.target).text('添加').css('color','red');

                break;

            case '更新':
                var color = $(event.target).css('color');

                var newvalue = {};
            
                console.log('=---------color------------=：', color);
                if (!$(event.target).hasClass('newRow')) {
                    var tds = $(parent).children('td');
                    parent.oldcontent = $(parent).text();
                    //var priFild = orgFilds[prindex];
                    var priValue = tds.eq(prindex).text();
                    
                    if (!priValue) {
                        alert(priKey + '的值不能为空！');
                        return;

                    }
                    // var unique ={};
                    // unique[uniqueFild]=uniqeKey;
                    //event.target.confirmed=true;
                    /* 把单元格变为可写状态*/
                    var cells = $(parent).children('td');
                    for (var i = 0; i < filds.length; i++) {
                        if(prindex!==i)
                        cells.eq(i).find('p').attr('contentEditAble', 'true');
                    }
                    $(event.target).addClass('newRow');
                    $(parent).css('background-color', '#88ee88');
                } else {

                    if(parent.oldcontent=== $(parent).text()){
                       alert('内容没有改变无法更新！');
                       return;
                    }
                    //event.target.confirmed=false;
                    var tds = $(parent).children('td');
                    var unique = {};
                    // var uniqueFild = orgFilds[prindex];
                    var uniqeValue = tds.eq(prindex).text();
                    unique[priKey] = uniqeValue;

                    
                    //var tds = $(parent).children('td');
                    var changed = false;
                    for (var i = 0; i < orgFilds.length; i++) {
                        var curfild = orgFilds[i];
                        if(curfild!==priKey){
                            var text = tds.eq(i).text();
                            newvalue[curfild] = text;
                        }
                    }

                   
                    var info = [tableName, newvalue, unique];

                    var json = JSON.stringify(info);
                    console.log(json);
                    $.ajax({
                        url: "http://127.0.0.1:5757/api/update/",
                        type: "POST",
                        contentType: "application/json;charset=utf-8",
                        //data: {a:'aa',b:'bb'},
                        //headers:{'content-length',''}
                        data: json,
                        //content-length:JSON.stringify(params).length,
                        dataType: "json",
                        success: function(result) {
                            console.log(result);
                            $(event.target).removeClass('newRow');
                            //$(event.target).css('color', '');
                            $(parent).css('background-color', '');
                            for (var i = 1; i < orgFilds.length; i++) {
                                tds.eq(i).find('p').attr('contentEditAble', false);
                            }
                            if (result.changedRows > 0) {

                                alert('更新记录 ' + result.changedRows + ' 条成功！');
                            } else {
                                alert('更新记录未成功！');
                            }
                        },
                        error: function(e) {
                            console.log(e);
                            $(event.target).removeClass('newRow');
                            $(parent).css('background-color', '');
                            for (var i = 1; i < orgFilds.length; i++) {
                                cells.eq(i).find('p').attr('contentEditAble', false);
                            }
                            alert('更新记录失败！');
                        }
                    });
                }

                break;

            case '删除':
                var value = $(parent).children('td').eq(prindex);
                var key = orgFilds[prindex];
                var params　 = {};

                if (!value.text()) {
                    $(parent).remove();
                    //alert(key + '列不能为空！');
                    break;
                }

                var res = confirm('你确定要删除' + key + '=' + value.text() + '的数据吗？');
                if (!res) {
                    return;
                }
                params[key] = value.text();
                var json = JSON.stringify([tableName, params]);

                $.ajax({
                    url: "http://127.0.0.1:5757/api/delete/",
                    type: "POST",
                    contentType: "application/json;charset=utf-8",
                    //data: {a:'aa',b:'bb'},
                    //headers:{'content-length',''}
                    data: json,
                    //content-length:JSON.stringify(params).length,
                    dataType: "json",
                    success: function(result) {
                        console.log(result);

                        // for (var i = 1; i < orgFilds.length; i++) {
                        //     tds.eq(i).find('p').attr('contentEditAble', false);
                        // }
                        if (result.affectedRows > 0) {
                            // $(event.target).css('color', '');
                            // $(parent).css('background-color','');
                            $(parent).remove();
                            alert('删除记录 ' + result.affectedRows + ' 条成功！');
                        } else {
                            alert('删除记录未成功！');
                        }
                    },
                    error: function(e) {
                        console.log(e);
                        $(event.target).css('color', '');
                        $(parent).css('background-color', '');
                        for (var i = 1; i < orgFilds.length; i++) {
                            cells.eq(i).find('p').attr('contentEditAble', false);
                        }
                        alert('删除记录失败！');
                    }
                });
                break;
        }

        

    }
    //console.log('option:   ',option);
    //var row = getRow(rowIndex);
    // var data = {table:tableName,alias:alias};

    
    
   // renderTable(data);
