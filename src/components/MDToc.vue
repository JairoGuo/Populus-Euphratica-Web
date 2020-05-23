<template>

  <div>
      <div class="all-container">
    <div class="blog-wrapper">
      <Header :scroll="scroll" />
      <div class="blog-container">
        <div class="blog-list">
          <div class="blog-list-container">
            <div class="list-header detail">
              <a
                class="link-tab title"
                @click="$router.back()"
              > <i class="iconfont icon-back6" />{{ blog.title }}</a>
            </div>
            <mavon-editor
              ref="mavon"
              v-model="blog.content"
              :toolbars-flag="false"
              :ishljs="true"
              :subfield="false"
              default-open="preview"
              :navigation="false"
              @click.native="buildNavigation"
            />
          </div>
        </div>

          <div class="wx_navigation">
            <div class="navigator-item">
              目录
            </div>
          </div>

          <div
            id="navigation"
            class="wx_navigation"
          />

      </div>
    </div>
  </div>


  </div>

</template>

<script>
    export default {
        name: "MDToc",
      data()
      {
        return {
           blog: {
          content: '## Javascript ES6 `展开语法` 和 `解构赋值语法` \n' +
            '\n' +
            '\n' +
            '\n' +
            '### 展开语法\n' +
            '\n' +
            '**展开语法(Spread syntax),** 可以在函数调用或数组构造时, 将数组表达式或者string在语法层面展开；还可以在构造字面量对象时, 将对象表达式按键值的方式展开。\n' +
            '\n' +
            '函数参数展开\n' +
            '\n' +
            '```javascript\n' +
            'function fun(a, b, c) {\n' +
            '    console.log(a, b, c)\n' +
            '}\n' +
            'let args = [1, 2, 3]\n' +
            'fun(...args)\n' +
            '// 1 2 3\n' +
            '\n' +
            'function fun1(a, b, c, d) {\n' +
            '    console.log(a, b, c, d)\n' +
            '}\n' +
            'let args = [2, 3]\n' +
            'fun1(1, ...args, 4)\n' +
            '// 1 2 3 4\n' +
            '```\n' +
            '\n' +
            '数组使用展开语法\n' +
            '\n' +
            '```javascript\n' +
            'let array1 = [1, 2, 3]\n' +
            'let array2 = [\'hello\', ...array1]\n' +
            'console.log(array2) // ["hello", 1, 2, 3]\n' +
            '```\n' +
            '\n' +
            '数组的深拷贝\n' +
            '\n' +
            '```javascript\n' +
            'let array1 = [1, 2, 3]\n' +
            'let array2 = array1 \n' +
            'let array3 = [...array1]\n' +
            'array2.push(4);\n' +
            'array3.push(5)\n' +
            'console.log(array1) // [1, 2, 3, 4]\n' +
            'console.log(array2) // [1, 2, 3, 4]\n' +
            'console.log(array3) // [1, 2, 3, 5]\n' +
            '```\n' +
            '\n' +
            '对象开展语法\n' +
            '\n' +
            '```javascript\n' +
            'let obj1 = { foo: \'bar\', x: 42 }\n' +
            'let obj2 = { foo: \'baz\', y: 13 }\n' +
            '\n' +
            'let clonedObj = { ...obj1 } // 克隆后的对象: { foo: "bar", x: 42 }\n' +
            '\n' +
            'let mergedObj = { ...obj1, ...obj2 } // 合并后的对象: { foo: "baz", x: 42, y:\n' +
            '13 }\n' +
            '```\n' +
            '\n' +
            '#### 扩展\n' +
            '\n' +
            '剩余语法（剩余参数）：\n' +
            '\n' +
            '> 剩余语法(Rest syntax) 看起来和展开语法完全相同，不同点在于, 剩余参数用于解构数组和对象。从某种意义上说，剩余语法与展开语法是相反的：展开语法将数组展开为其中的各个元素，而剩余语法则是将多个元素收集起来并“凝聚”为单个元素。\n' +
            '\n' +
            '```javascript\n' +
            'function fun(a, b, ...theArgs) {\n' +
            '  console.log(a, b, theArgs)\n' +
            '}\n' +
            'fun(1, 2, 3, 4, 5) // 1 2 [3, 4, 5]\n' +
            '```\n' +
            '\n' +
            '剩余参数和 `arguments`对象之间的区别主要有三个：\n' +
            '\n' +
            '> - 剩余参数只包含那些没有对应形参的实参，而 `arguments` 对象包含了传给函数的所有实参。\n' +
            '>\n' +
            '> - `arguments`对象不是一个真正的数组，而剩余参数是真正的 `Array`实例，也就是说你能够在它上面直接使用所有的数组方法，比如 `sort`，`map`，`forEach`或`pop`。\n' +
            '>\n' +
            '> - `arguments`对象还有一些附加的属性 （如`callee`属性）。\n' +
            '\n' +
            '### 解构赋值\n' +
            '\n' +
            '通过**解构赋值,** 可以将属性或值从对象或数组中取出,赋值给其他变量。\n' +
            '\n' +
            '解构数组是将取值数组的元素与变量数据相对应，将数组中位置一致的值赋值给等号左边位置相同的变量。\n' +
            '\n' +
            '解构对象是将**相同键的对象**相对应进行解构赋值。\n' +
            '\n' +
            '```javascript\n' +
            'let a, b, c\n' +
            '// 数组形式解构(解构数组) ↓\n' +
            'let [a, b] = [1, 2] // 变量声明并赋值时的解构\n' +
            '[a, b] = [1, 2] // 变量先声明后赋值时的解构\n' +
            'console.log(a, b) // 1 2\n' +
            '[a, b] = [1, 2, 3, 4]\n' +
            'console.log(a, b) // 1 2\n' +
            '\n' +
            '[a, b, ...c] = [1, 2, 3, 4, 5]\n' +
            'console.log(a, b, c); // 1 2 [1, 2, 3, 4, 5]\n' +
            '\n' +
            '// 对象形式结构(解构对象) ↓\n' +
            'let {a, b} = {a: 10, b: 20} // 声明解构赋值\n' +
            'console.log(a, b); // 10 20\n' +
            '({a, b} = {a: 10, b: 20}) // 无声明解构赋值\n' +
            'console.log(a, b); // 10 20\n' +
            '({a, b, ...c} = {a: 10, b: 20, c: 30, d: 40, e: 50}) // Rest剩余参数语法(展开语法)\n' +
            'console.log(a, b, c) // 10 20 {c: 30, d: 40, e: 50}\n' +
            '```\n' +
            '\n' +
            '> ##### 注意：\n' +
            '>\n' +
            '> 赋值语句周围的圆括号 `( ... )` 在使用对象无声明解构赋值时是必须的。\n' +
            '>\n' +
            '> `{a, b} = {a: 10, b: 20}` 不是有效的独立语法，因为左边的 `{a, b}` 被认为是一个块而不是对象字面量。\n' +
            '>\n' +
            '> 然而，`({a, b} = {a: 1, b: 2})` 是有效的，正如 `var {a, b} = {a: 1, b: 2}`。\n' +
            '>\n' +
            '> 需要注意的是 `( ... )` 表达式之前需要有一个分号，否则它可能会被当成上一行中的函数执行。\n' +
            '>\n' +
            '> ```javascript\n' +
            '> let a, b\n' +
            '> console.log(\'hello\')\n' +
            '> ({a, b} = {a:1, b:2})\n' +
            '> console.log(a, b)\n' +
            '> \n' +
            '> // Uncaught TypeError: console.log(...) is not a function\n' +
            '> ```\n' +
            '>\n' +
            '> 以下是不正确的赋值方法：\n' +
            '>\n' +
            '> ```javascript\n' +
            '> // 错误的赋值方法 ↓\n' +
            '> let c = {a: 1, b: true}\n' +
            '> let a, b\n' +
            '> {a, b} = c\n' +
            '> \n' +
            '> // Uncaught SyntaxError: Unexpected token \'=\'\n' +
            '> \n' +
            '> // 正确的赋值方法 ↓\n' +
            '> let c = {a: 1, b: true}\n' +
            '> let {a, b} = c\n' +
            '> // 或\n' +
            '> let c = {a: 1, b: true}\n' +
            '> let a, b\n' +
            '> ({a, b} = c)\n' +
            '> ```\n' +
            '>\n' +
            '> 如果 `( ... )` 表达式是没有声明时赋值的，则有无分号都无影响。\n' +
            '\n' +
            '解构赋值中为了防止从数组取值为 `undefined` 提供里**默认值**，说白了就是为了防止变量数量少于取值数组数量时来为多余的变量赋予**默认值**。\n' +
            '\n' +
            '```javascript\n' +
            'let a, b\n' +
            '\n' +
            '[a, b] = [1]\n' +
            'console.log(a, b) // 1 undefined\n' +
            '\n' +
            '[a, b=2] = [1]\n' +
            'console.log(a, b) // 1 2\n' +
            '\n' +
            'let {a, b = 5} = {a: 1};\n' +
            'console.log(a, b); // 1 5\n' +
            '```\n' +
            '\n' +
            '此外利用解构赋值语法可以更简便的**交换变量**\n' +
            '\n' +
            '```javascript\n' +
            'let a=1, b=2\n' +
            'console.log(a, b) // 1 2\n' +
            '[a, b] = [b, a]\n' +
            'console.log(a, b) // 2 1\n' +
            '```\n' +
            '\n' +
            '忽略部分值\n' +
            '\n' +
            '```javascript\n' +
            'let a, b\n' +
            '[a,, b] = [1, 2, 3]\n' +
            'console.log(a, b) // 1 3\n' +
            '```\n' +
            '\n' +
            '当然，你可以忽略所有值，不过这好像并没有什么意义\n' +
            '\n' +
            '```javascript\n' +
            '[,,] = [1, 2, 3]\n' +
            '```\n' +
            '\n' +
            '-----\n' +
            '\n' +
            '解构对象给新的变量名赋值\n' +
            '\n' +
            '```javascript\n' +
            'let c = {a: 1, b: true};\n' +
            'let {a: foo, b: bar} = c;\n' +
            ' \n' +
            'console.log(foo, bar); // 1 true\n' +
            '```\n' +
            '\n' +
            '解构对象给新的变量名赋值并提供默认值\n' +
            '\n' +
            '```javascript\n' +
            'var {a:foo, b:bar = 5} = {a: 3};\n' +
            'console.log(foo, bar); // 3 5\n' +
            '```\n' +
            '\n' +
            '#### 扩展\n' +
            '\n' +
            '解构嵌套对象和数组\n' +
            '\n' +
            '```js\n' +
            'const metadata = {\n' +
            '  title: \'Scratchpad\',\n' +
            '  translations: [\n' +
            '    {\n' +
            '      locale: \'de\',\n' +
            '      localization_tags: [],\n' +
            '      last_edit: \'2014-04-14T08:43:37\',\n' +
            '      url: \'/de/docs/Tools/Scratchpad\',\n' +
            '      title: \'JavaScript-Umgebung\'\n' +
            '    }\n' +
            '  ],\n' +
            '  url: \'/en-US/docs/Tools/Scratchpad\'\n' +
            '};\n' +
            '\n' +
            'let {\n' +
            '  title: englishTitle, // rename\n' +
            '  translations: [\n' +
            '    {\n' +
            '       title: localeTitle, // rename\n' +
            '    },\n' +
            '  ],\n' +
            '} = metadata;\n' +
            '\n' +
            'console.log(englishTitle); // "Scratchpad"\n' +
            'console.log(localeTitle);  // "JavaScript-Umgebung"\n' +
            '```\n' +
            '\n' +
            'For of 迭代和解构\n' +
            '\n' +
            '```js\n' +
            'let people = [\n' +
            '  {\n' +
            '    name: \'Mike Smith\',\n' +
            '    family: {\n' +
            '      mother: \'Jane Smith\',\n' +
            '      father: \'Harry Smith\',\n' +
            '      sister: \'Samantha Smith\'\n' +
            '    },\n' +
            '    age: 35\n' +
            '  },\n' +
            '  {\n' +
            '    name: \'Tom Jones\',\n' +
            '    family: {\n' +
            '      mother: \'Norah Jones\',\n' +
            '      father: \'Richard Jones\',\n' +
            '      brother: \'Howard Jones\'\n' +
            '    },\n' +
            '    age: 25\n' +
            '  }\n' +
            '];\n' +
            '\n' +
            'for (var {name: n, family: {father: f}} of people) {\n' +
            '  console.log(\'Name: \' + n + \', Father: \' + f);\n' +
            '}\n' +
            '\n' +
            '// "Name: Mike Smith, Father: Harry Smith"\n' +
            '// "Name: Tom Jones, Father: Richard Jones"\n' +
            '```\n' +
            '\n' +
            '从作为函数实参的对象中提取数据\n' +
            '\n' +
            '```js\n' +
            'function userId({id}) {\n' +
            '  return id;\n' +
            '}\n' +
            '\n' +
            'function whois({displayName: displayName, fullName: {firstName: name}}){\n' +
            '  console.log(displayName + " is " + name);\n' +
            '}\n' +
            '\n' +
            'let user = { \n' +
            '  id: 42, \n' +
            '  displayName: "jdoe",\n' +
            '  fullName: { \n' +
            '      firstName: "John",\n' +
            '      lastName: "Doe"\n' +
            '  }\n' +
            '};\n' +
            '\n' +
            'console.log("userId: " + userId(user)); // "userId: 42"\n' +
            'whois(user); // "jdoe is John"\n' +
            '```\n' +
            '\n' +
            '从ECMAScript 2015开始，对象初始化语法开始支持计算属性名。其允许在[]中放入表达式，计算结果可以当做属性名。计算属性名可以被解构。\n' +
            '\n' +
            '```js\n' +
            'let key = "z";\n' +
            'let {[key]: foo} = {z: "bar"};\n' +
            '\n' +
            'console.log(foo); // "bar"\n' +
            '```'
        }
        }


  },

      methods: {
      init() {
        // this.vloading = true
     this.buildNavigation()
      },
      changePage() {
        this.init()
      },
      buildNavigation() {
        var a = document.getElementById('navigation')
        a.innerHTML = this.$refs.mavon.d_render // mavmon根据marodown内容生成的dom

        const nodes = a.children
        var newDoms = []

        if (nodes.length) {
          for (let i = 0; i < nodes.length; i++) {
            const id = (nodes[i].children && nodes[i].children.length) ? nodes[i].children[0].id : ''
            judageH(nodes[i], i, nodes, id)
          }
        }
        function judageH(node, i, nodes, domId) {
          const reg = /^H[1-6]{1}$/
          if (!reg.exec(node.tagName)) { // 把不是h标签的都过滤掉
            node.style.display = 'none'
          } else {
            node.classList.add('navigator-item')
            const nodeArr = node.innerHTML.split('</a>')

            // const id = nodeArr[0].replace(/[^0-9]+/g, '')
            const id = domId
            const content = nodeArr[1]

            var childs = node.childNodes
            for (var index = childs.length - 1; index >= 0; index--) {
              node.removeChild(childs[index])
            }

            const a = document.createElement('a')

            a.id = id
            a.innerHTML = content
            console.log(content)
            node.appendChild(a)
            // console.log(id, content, node.tagName)
            node.onclick = function() {
              window.location.replace('#' + this.children[0].id)
            }
            newDoms.push(node)
          }
        }
        const sliceDoms = [] // 归类好的节点树

        newDoms.forEach((dom, i) => { // 把标题归类 每部分的标题组合到一起
          const level = dom.tagName.substr(1)
          const upLevel = newDoms[i - 1] ? newDoms[i - 1].tagName.substr(1) : ''

          if (upLevel) {
            if (level > upLevel) {
              sliceDoms[sliceDoms.length - 1].push(dom)
            } else if (level > sliceDoms[sliceDoms.length - 1][0].tagName.substr(1)) {
              sliceDoms[sliceDoms.length - 1].push(dom)
            } else {
              sliceDoms.push([dom])
            }
          } else {
            sliceDoms.push([dom])
          }
        })
        sliceDoms.forEach(doms => {
          const thisTitleMaxId = doms[0].tagName.substr(1)
          doms.forEach(dom => {
            const domHeadingLevel = dom.tagName.substr(1) - thisTitleMaxId + 1
            dom.classList.add('heading_' + domHeadingLevel)
          })
        })
      }
    }
    }
</script>

<style scoped>
.v-note-wrapper .v-note-panel.shadow {
  box-shadow: none !important;
}
</style>
