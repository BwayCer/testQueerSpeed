程式名
=======


> 版本： v0.0.0<br />
> 作者： 姓名 <信箱> (網站)<br />
> 授權： [授權代碼](http://spdx.org/licenses)



## 簡介


程式的效能真的準確嗎？


以亂數寫入物件，並以測迴圈多次執行後的速度。

其中奇怪的事發生了，`/1/` 執行的次數及註解的數量居然也能影響速度。
你一定也認為會變慢是正常的，但結果是加速！加速！加速！


```
node test/efx_emptyEnum.js 1 1000000 0 7
```

```
node test/efx_emptyEnum.js 1 1000000 0 120
```

```
  var n = 99;
  while ( n-- ) /1/;
```

```
//     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
//     xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

