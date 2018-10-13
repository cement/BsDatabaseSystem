 (function() {
    var filds = [],
        orgFilds = [];
    dbName = "chinesearea";
    tableName = 'cityinfo';
    alias ='';

    // function getRow(rowIndex) {
    //     return $("#table tr").eq(rowIndex);
    // }

    // function getCell(rowIndex, cellIndex) {
    //     return $("#table tr").eq(rowIndex).find("td").eq(cellIndex);
    // }

    function curdClick(event) {

        var parent = event.delegateTarget.parentElement;
        var rowIndex = parent.rowIndex;
        var option = $(event.target).text();


        switch (option) {
            case '增加':
                if (!$(event.target).hasClass('newRow')) {
                    //event.target.confirmed=true;

                    var newtrow = $('<tr></tr>');
                    var innerHtml = '<td></td>';
                    for (var k = 1; k < orgFilds.length; k++) {
                        innerHtml += '<td ><p contentEditable=true></p></td>';
                    }

                    newtrow.html(innerHtml);
                    var curd = $('<td class="option">' +
                        '<a href=""  class="newRow">增加</a>' +
                        '<a href="">更新</a>' +
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

                    var unique = {};
                    var uniqueFild = orgFilds[0];
                    var uniqeKey = tds.eq(0).text();
                    unique[uniqueFild] = uniqeKey;
                    // unique[orgFilds[0]]=tds.eq(0).text();
                    var params = {};

                    for (var i = 1; i < orgFilds.length; i++) {
                        var text = tds.eq(i).text();
                        params[orgFilds[i]] = text;
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
                            for (var i = 1; i < orgFilds.length; i++) {
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
                // event.target.confirmed=false;
                console.log('=---------color------------=：', color);
                if (!$(event.target).hasClass('newRow')) {
                    var tds = $(parent).children('td');
                    var uniqueFild = orgFilds[0];
                    var uniqeKey = tds.eq(0).text();

                    if (!uniqeKey) {
                        alert(uniqueFild + '不能为空！');
                        return;

                    }
                    // var unique ={};
                    // unique[uniqueFild]=uniqeKey;
                    //event.target.confirmed=true;
                    /* 把单元格变为可写状态*/
                    var cells = $(parent).children('td');
                    for (var i = 1; i < orgFilds.length; i++) {
                        cells.eq(i).find('p').attr('contentEditAble', 'true');
                    }
                    $(event.target).addClass('newRow');
                    $(parent).css('background-color', '#88ee88');
                } else {
                    //event.target.confirmed=false;
                    var tds = $(parent).children('td');
                    var unique = {};
                    var uniqueFild = orgFilds[0];
                    var uniqeKey = tds.eq(0).text();
                    unique[uniqueFild] = uniqeKey;

                    var params = {};
                    //var tds = $(parent).children('td');

                    for (var i = 1; i < orgFilds.length; i++) {
                        var text = tds.eq(i).text();
                        params[orgFilds[i]] = text;
                    }
                    //var tableInfo = {db:dbName,table:tableName};

                    var info = [tableName, params, unique];

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
                var value = $(parent).children('td').eq(0).text();
                var key = orgFilds[0];
                var params　 = {};

                if (!value) {
                    alert(key + '列不能为空！');
                    break;
                }

                var res = confirm('你确定要删除' + key + '=' + value + '的数据吗？');
                if (!res) {
                    return;
                }
                params[key] = value;
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
    var data = {table:tableName,alias:alias};


    $.ajax({
        url: "http://127.0.0.1:5757/api/query"+window.location.search,
        type: "get",
        dataType: "json",
        //data:data,
        success: function(resp) {
            console.log(resp[0]);
            dbName = resp[0][0].db;
            tableName = resp[0][0].orgTable;
            $('#caption span').text(resp[0][0].table);
            //var th = $('#th')
            //var res = JSON.parse(resp);
            //var filds = [],orgFilds = [];
            //console.log(resp[0]);
            for (var i = 0; i < resp[0].length; i++) {
                var fild = resp[0][i].name;
                var orgFild = resp[0][i].orgName;
                $('#thead').append('<th>' + fild + '</th>');
                filds.push(fild);
                orgFilds.push(orgFild);
            }
            $('#thead').append('<th>操作</th>');
            /* 添加数据*/
            for (var j = 0; j < resp[1].length; j++) {
                var newtrow = $('<tr></tr>');
                var innerHtml = '';
                for (var k = 0; k < orgFilds.length; k++) {
                    var cell = resp[1][j][orgFilds[k]];
                    cell = cell ? cell : '';
                    //newtrow.append(`<td>${cell}</td>`);
                    innerHtml += '<td><p>' + cell + '</p></td>';
                }

                newtrow.html(innerHtml);
                var option = $('<td class="option">' +
                    '<a href="">增加</a><a href="">更新</a><a href="">删除</a>' +
                    ' </td>');
                newtrow.append(option);
                $('#tbody').append(newtrow);
                option.on('click', 'a', function(event) {
                    event.preventDefault();
                    // e.stopPropagation();
                    curdClick(event);

                })
            }

            console.log(resp);
        },
        error: function(e) {
            console.log(e);
        }
    });

})($);