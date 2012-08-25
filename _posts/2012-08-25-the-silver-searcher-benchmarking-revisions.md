---
date: '2012-08-25 00:05:59'
layout: post
slug: the-silver-searcher-benchmarking-revisions
title: 'The Silver Searcher: Benchmarking Revisions'
published: true
categories:
- Computers
- the_silver_searcher
---

I was curious about the performance of versions of [Ag](https://github.com/ggreer/the_silver_searcher) over time, so I wrote a script to benchmark every revision from January to present.

{% highlight bash %}
#!/bin/bash

function benchmark_rev() {
    REV=$1
    git checkout $REV &> /dev/null
    if [ $? -ne 0 ]; then
        echo "Checkout of $REV failed!"
        exit 1
    fi
    ./build.sh &> /dev/null
    if [ $? -ne 0 ]; then
        echo "Build of $REV failed!"
    fi

    # grep to filter out occasional debugging lines I printed out
    TIME1=`./ag --stats blahblahblah ~/code/ 2>&1 | grep seconds | tail -n 1 | awk '{print $1}'`
    TIME2=`./ag --stats blah.*blah ~/code/ 2>&1 | grep seconds | tail -n 1 | awk '{print $1}'`
    TIME3=`./ag --stats -i blahblahblah ~/code/ 2>&1 | grep seconds | tail -n 1 | awk '{print $1}'`
    echo "[\"$REV\", $TIME1, $TIME2, $TIME3],"
}

# 6a38fb74 is the first rev that supports --stats
REV_LIST=`git rev-list 6a38fb74..master`

for rev in $REV_LIST; do
    benchmark_rev $rev
done
{% endhighlight %}

This script runs three benchmarks on each revision: Case-sensitive string matching, regular expression matching, and case-insensitive string matching. The results surprised me.

<div id="chart_div" style="width: 100%; height: 500px;"> </div>

Hover over the lines and annotations for more information about each revision. Zero values are due to incorrect behavior or failed builds. For personal projects like Ag, I don't spend much effort making sure master is always deployable. Tagged releases are another matter, of course.

Graphing the performance over time makes regressions obvious. One change made the benchmarks double in execution time, from 2 seconds to 4. (For comparison, grep -r takes 11 seconds and spits out tons of useless matches. Ack takes 20 seconds.)

The first thing that caught my eye was the spike labelled B. I found that all my hard work improving performance was negated by a single commit: [13f1ab69](https://github.com/ggreer/the_silver_searcher/commit/13f1ab693ca056698a370c65b8d139faed782261). This commit called `fnmatch()` twice as much as previous versions. Over 50% of execution time was already spent in `fnmatch()`, so it really hurt performance. The drop at D is from me backing-out the change until I can write something that doesn't slow things down.

Looking at other specific changes, I can also see that [43886f9b](https://github.com/ggreer/the_silver_searcher/commit/43886f9b08d0772b54f21a291a0794d060f700f7) (annotation C) improved string-matching performance by 30%. This was not intended. I was cleaning up some code and fixed an off-by-one error that slightly impacted performance. It certainly wasn't going to cause a 30% difference. After git-blaming, I found the commit that introduced the problem: [01ce38f7](https://github.com/ggreer/the_silver_searcher/commit/01ce38f7f578b6b6141385688ff3c068390635df) (annotation A). This was quite a stealthy performance regression. It was caused by my brain mixing up Python and C. In Python, `3 or 1` is `3`. In C, `3 || 1` evaluates to `1`. Using `f_len - 1 || 1` filled the `skip_lookup` array with 1's, causing `boyer_moore_strnstr()` to only skip 1 character instead of up to `f_len - 1` characters.

This mistake cut performance in half, and I fixed it three days ago without intending to. Once again, I am humbled by the mindless computer. On the bright side, now I'll quickly notice performance regressions.

<script type="text/javascript" src="https://www.google.com/jsapi"> </script>
<script type="text/javascript">
  // Load the Visualization API and the piechart package.
  google.load('visualization', '1.0', {'packages':['corechart']});

  // Set a callback to run when the Google Visualization API is loaded.
  google.setOnLoadCallback(drawChart);

  // Callback that creates and populates a data table,
  // instantiates the pie chart, passes in the data and
  // draws it.
  function drawChart() {
    // Create the data table.
    var data = new google.visualization.DataTable();
    data.addColumn("string", "Revision");
    data.addColumn({"type": "string", "role": "annotation"});
    data.addColumn({"type": "string", "role": "annotationText"});
    data.addColumn("number", "ag blahblahblah");
    data.addColumn("number", "ag blah.*blah");
    data.addColumn("number", "ag -i blahblahblah");
    data.addRows([
      ["44181463797348858cd784fe7ec6ba9595974f87", null, null, 2.447125, 2.453592, 2.527203],
      ["9926c63c704a0afc2b0ea7f6313393b764806038", null, null, 2.473893, 2.454713, 2.563011],
      ["91e4b6e1e5fe74b4db17123c513fb0c06a92f594", null, null, 2.436783, 2.450894, 2.541754],
      ["1abf57b3829f382f19af62728c82d3b133fec20e", null, null, 2.450197, 2.455612, 2.536369],
      ["ba538f80cffe4ddaaf4b415c866dae9188bc21c1", null, null, 2.443246, 2.450718, 2.531213],
      ["32864224da8fefded881352183d721d610679db3", null, null, 2.438948, 2.458986, 2.545355],
      ["614fd44de9ef2dfbe6271fa72180aea985da5e7c", null, null, 2.461758, 2.448127, 2.563501],
      ["fb48a3b889a20c4940cc19aa86a21d00dcd72831", null, null, 2.440569, 2.465999, 2.530725],
      ["5af86b876479c9edbb21e8b509773d518ce4ab5e", null, null, 2.439520, 2.453838, 2.847319],
      ["47b57a8bdc4bf1d48b0eb8e15181dea5a8a5e65d", null, null, 2.446491, 2.457614, 2.558020],
      ["c7333a5a120da189c0cd87765d11d7885b160b2b", null, null, 2.435911, 2.457472, 2.552993],
      ["54adfce0cf7099f7a13819ef5032347542c5938a", null, null, 2.454247, 2.459558, 2.535551],
      ["4668634e32da322f8218370e283a0bc08bf9c873", null, null, 2.471282, 2.452500, 2.543730],
      ["5c4c9ff750dabb675c02dc1bc233b5678ca3f088", null, null, 2.438637, 2.458889, 2.536287],
      ["ec643dedd77b0761af24459b3012aaecc2c6faea", null, null, 2.442934, 2.459810, 2.562315],
      ["a9b9420e9615f2581fb9d16325817effd1f35081", null, null, 2.447522, 2.465832, 2.528757],
      ["b1f0a4ee05d0d58661da764d17078ea5475e843a", null, null, 2.429483, 2.438657, 2.519221],
      ["7601fbb470ab9101e95a6c2c6a5e5f8f422deda6", null, null, 2.436860, 2.440311, 2.519275],
      ["02922b0a55009963c0f1a323567bcae45bca2e86", null, null, 2.430598, 2.435130, 2.524473],
      ["5c99f5691688547499216d0c7daf1f6fc89a5828", null, null, 2.447069, 2.436634, 2.523311],
      ["ee2127039e6a4311b3e981658a6546b6ed130383", null, null, 2.424768, 2.441598, 2.515442],
      ["18b46a9dbb76604da4615ee2974779b9b9a05bc4", null, null, 2.444614, 2.439495, 2.529400],
      ["30ee9bc6500f1429b224de5c8227d728d4cc167e", null, null, 2.426228, 2.465079, 2.526369],
      ["ca5e7779ac47701e67e875f13a93503c4313a9a4", null, null, 2.429907, 2.439126, 2.518858],
      ["65d1b934a7589a80410868237d2503310a77e8c0", null, null, 2.453211, 2.454187, 2.526243],
      ["05e0995ce547624b88d643952ed2e863298cfe50", null, null, 2.431570, 2.450094, 2.548102],
      ["d52073085016ba989b1bdd2e8c22b169e9727578", null, null, 2.449881, 2.500533, 2.517854],
      ["e60d56e62d99cadd46cee9e1fdc528dbfb82915c", null, null, 2.426334, 2.456009, 2.535067],
      ["7efae7e370a0d8e1b69793780e09a3ca03d15820", null, null, 2.429736, 2.442382, 2.513814],
      ["bc4d9009586c869f3cf0327e122e4129dbd186f0", null, null, 2.424551, 2.432463, 2.521448],
      ["f77f80978fcedd9ca885c7d492832333a3b843b0", null, null, 2.425331, 2.445421, 2.537143],
      ["72ef24539a8cd5aacd739685c6438e2b91c59a44", null, null, 2.435381, 2.458320, 2.523315],
      ["c2ccd15007fb9aa77ab9b835c1d416b56bf91e74", null, null, 2.424482, 2.435457, 2.513840],
      ["788be3f4c26207ff275d0c1f4a1c810fe9f0e71a", null, null, 2.430501, 2.439303, 2.548394],
      ["64d2ea1dc734770601dbfb9f86771b7d32166fcd", null, null, 2.445332, 2.454144, 2.546450],
      ["60f53d9f68ea423c6120f59146ad1a85b1e2fa56", null, null, 2.449715, 2.450280, 2.523617],
      ["22ee1595a422b308703e1ba2bf63515a4fc36089", null, null, 2.436010, 2.467538, 2.540509],
      ["d5d8ed42037bf8caeaaf0d812a6204b08f184382", null, null, 2.435768, 2.447740, 2.533074],
      ["f7c685dfff75721357b0842d3d54cf8e4b49f1cf", null, null, 2.428962, 2.444708, 2.525685],
      ["377b56ef3f37b5794e5d9abf6a59eef87a2e25fb", null, null, 2.434137, 2.476335, 2.527977],
      ["41ec571e08ead282db02cf82da10b0efb817b902", null, null, 2.440679, 2.456361, 2.517147],
      ["2a72344b080aaa61b7cd7fe77ebcd13b62024e7c", null, null, 2.436124, 2.446591, 2.525233],
      ["863ba982a1f9dd333ff2a80108873d7854a201b0", null, null, 2.421414, 2.440348, 2.522223],
      ["dd466b650d0e62a396bcbf3f5b4be6b8dd45771a", null, null, 2.418038, 2.451946, 2.518171],
      ["b3e8409f3be903e7941e46e87b5245e6e21f0273", null, null, 1.984703, 2.444653, 2.074315],
      ["d07cf7562e09767c0c1dcee74e3ca900e13875cc", null, null, 2.003524, 2.458804, 2.091102],
      ["76fb0928ba768b8d1fee038d1ed5176524a7bd49", null, null, 1.991097, 2.439053, 2.085998],
      ["fd9588264f63efa95670f62c0550a8a4ed07e32e", null, null, 1.994781, 2.463081, 2.073776],
      ["be38a9be58a63e35f635ed14fdc7642c2cd0dac9", null, null, 0, 0, 0],
      ["5d5735b45816d431785d5c21af7a3d364a056348", null, null, 0, 0, 0],
      ["9b8df2393ae9a5fa1330ee5181482b0315f1ad93", null, null, 0, 0, 0],
      ["a213c896924b6ee6f65efbd2e5e61fad6257105c", null, null, 1.990307, 2.438545, 2.084614],
      ["e693ad32b02dbeb9414ae187ae39fd9beab9849d", null, null, 1.991329, 2.454921, 2.077483],
      ["9151801fd84e97475d9419008a30bac4a3c092db", null, null, 2.006487, 2.436207, 2.077086],
      ["a57c478eb8b265918e7ad8d69c480500baa564e9", null, null, 1.999940, 2.470325, 2.076662],
      ["5b904ba6327867e1c558cea19113fc9e8bf5f06b", null, null, 1.993385, 2.437301, 2.086165],
      ["06e52ff12da321952b5143855b6357ded15f80c2", null, null, 1.983818, 2.453530, 2.104478],
      ["024148b7997c5a48ee6fe85d1d4903a2070277ea", null, null, 1.985188, 2.450912, 2.077209],
      ["01434f9cd1a41d30559216f38ac3ec7b9b33a628", null, null, 1.999970, 2.443262, 2.083799],
      ["39e1045673a74ffaa217f9adb0db4735a8b8f8ca", null, null, 1.982899, 2.466367, 2.077040],
      ["921c8f1f3fbd10d75a8c0a5880f1d53984218e07", null, null, 1.979510, 2.452259, 2.099135],
      ["2064b30bf024e7a4b1cc7c23d4736538657acab8", null, null, 1.986939, 2.441607, 2.129032],
      ["652c019388c341fddfda53b3e2af26200d6c5052", null, null, 1.987917, 2.444718, 2.081224],
      ["60a610fc4b4113d26441b6b06055c1ac51578c2d", null, null, 1.991632, 2.445602, 2.076806],
      ["919e87053555bf5815c89a32a09f41edc5158840", null, null, 1.989961, 2.440160, 2.098846],
      ["c729abd1804632436e5a201b00d255c5f88b9a96", null, null, 1.990774, 2.446929, 2.086138],
      ["58f1f946135e2e9d83136b37df43709622054735", null, null, 1.998313, 2.443143, 2.088732],
      ["d5a769d96c9e6a1bf386d90f5db014edbdb3270c", null, null, 1.986815, 2.442869, 2.089600],
      ["9fa2bd4a424dc28c8ae7b9f0504a4914064d8027", null, null, 2.009126, 2.467219, 2.097220],
      ["6e0207f03e234ae32c93986999719ee71dbf3206", null, null, 1.997648, 2.438297, 2.085471],
      ["43eb7b2c2c4c046ed4e580e3d8386bae120b59fb", null, null, 1.988282, 2.449209, 2.084520],
      ["bc090fa6b996b0f0cc8718a0ddcba1f3f1eb3739", null, null, 2.000312, 2.437428, 2.078026],
      ["4090b355c70317ff15ee48715852f69046fc285f", null, null, 1.990429, 2.446452, 2.074055],
      ["8f393b41add25b3d2338cec1018345c2aabdd882", null, null, 1.999358, 2.469972, 2.072981],
      ["6a9bb993424dc2a70c78d812ff4865a240cac060", null, null, 1.978296, 2.433705, 2.080953],
      ["2fc9385436688d27a19002eca006ae490a9d699c", null, null, 1.984752, 2.459250, 2.074600],
      ["a34066802370b5ac32054a84e9423fb574cf6df1", null, null, 1.998852, 2.446769, 2.074730],
      ["1ed88db73e4ca1d9bc88af3f407f896257f289d2", null, null, 1.982650, 2.443469, 2.074420],
      ["b11efd868edaa52ff2cd22d4caa6bbe2e9cd8d5e", null, null, 1.989391, 2.437501, 2.091405],
      ["3bf01c6b20f27d0d3ab8f9c8ee5b40f0d3b9dd94", null, null, 1.982501, 2.446276, 2.073916],
      ["396c5c9a722c090fa1fb55a451296d9821b3a500", null, null, 1.986673, 2.459830, 2.103038],
      ["55817728a18e92e1ffcc0b4d678c0041da7f9af4", null, null, 2.002161, 2.446594, 2.071708],
      ["6c8100f10a3c60903a88f77c94b5c41809562c9f", null, null, 2.017487, 2.436787, 2.069611],
      ["cf5ed11ea92ceb227ee338b9385255c33855c1aa", null, null, 1.983354, 2.446266, 2.081212],
      ["c8e777c2a66caaa7a6b6c7d25c106c87d4c54f31", null, null, 1.978300, 2.443377, 2.075673],
      ["724c7a46fd6d44c47438e0ee5148c42b75eb6c17", null, null, 1.990762, 2.446563, 2.078793],
      ["afd80cd0bff6f5def7fe85984655369f44c2533c", null, null, 2.010005, 2.446422, 2.077540],
      ["86df322972564cd324dab4926d97398a09d469b6", null, null, 1.993575, 2.438844, 2.087920],
      ["ec77b2abc5c8bc9f0b2587085553cb5039c7c211", null, null, 1.989948, 2.461909, 2.104959],
      ["f5bfa73f129b54057fe147ae945851c22c4aa082", null, null, 1.982831, 2.468843, 2.089512],
      ["ff2338aeccee6a1b912184cfd68b99c53d5b9c9d", null, null, 1.988492, 2.433783, 2.077977],
      ["c4a47759f57511322d10a40d4b1e7647a714a5df", null, null, 1.995386, 2.447903, 2.095025],
      ["fbe3bbc31f3bddd4968aa2c31420492a925d6a7e", null, null, 1.979621, 2.457107, 2.076299],
      ["0827f55e9e863e11af9a29970b3b11b789341f67", null, null, 1.995432, 2.433888, 2.071612],
      ["47232105524f6fd7d25e35093ec5de8dcf8ddeef", null, null, 1.995904, 2.441060, 2.093383],
      ["2fdf3522bd9855d1146beb5bf1b361a0948ffffb", null, null, 1.981267, 2.436139, 2.081561],
      ["80b324cce030961445720b806509cab54cc7fe67", null, null, 2.011628, 2.446469, 2.067112],
      ["ae204d4fd57ca18ffb74d894e6b49806dbb55d67", null, null, 1.998857, 2.448184, 2.100410],
      ["21603b561d45e17c877269aa61347c18899d0002", null, null, 1.993097, 2.443495, 2.087485],
      ["c8ed59b8c1c9f2b9eb5ad3955a8d8e746566f266", null, null, 1.995517, 2.462944, 2.087436],
      ["01ce38f7f578b6b6141385688ff3c068390635df", "A", "01ce38f7: f_len regression merged", 3.377963, 2.461669, 4.157862],
      ["a4d0c4aa873e5d0d7778523608120344acb07898", null, null, 3.367368, 2.434579, 4.149762],
      ["c7dc78cb0dd42fddf4a60779e499abe100689367", null, null, 3.389791, 2.432447, 4.138125],
      ["c2a74e149e5c6ff47f2b227d9f9b2ccaec4e723e", null, null, 3.373089, 2.454335, 4.146946],
      ["be67bd77f5668d0b6f5805edfbd13d2146777b35", null, null, 3.378335, 2.465618, 4.148667],
      ["abb4a7a356d6ab6c2deff069902546e79e9a64c3", null, null, 3.370707, 2.442066, 4.146086],
      ["271bc536ebff69081bf5b81eb8d009df0a4fe07b", null, null, 3.371801, 2.439444, 4.148813],
      ["ebb212ee571147fa4bfb4bed3545815176de65a0", null, null, 3.366095, 2.441801, 4.145235],
      ["7d6d36214b42a549a5b293dba1cc5baa7650cdab", null, null, 3.366371, 2.444828, 4.163001],
      ["b9ae7dd90fed6c7dc1ecc1ddc732ebdf6c2773cf", null, null, 3.387894, 2.437446, 4.172279],
      ["d009d56a2af64bf814f72f8ff53089ff4cc142ab", null, null, 3.369680, 2.446599, 4.149243],
      ["d0b840091c958a1d40b81f9199a533314305a8a4", null, null, 3.378871, 2.446280, 4.164922],
      ["6ac56f526b24943362b9b8550fef1fe87ea33589", null, null, 3.371362, 2.467731, 4.156095],
      ["83fd04f18e538d023d0f6b8a532b2921bbbfcae4", null, null, 3.369101, 2.462016, 4.158034],
      ["a23313a830b58543c48351e36667111fb3c6520b", null, null, 3.385256, 2.446307, 4.179936],
      ["288545da09b8b19354a2f77d0b1f66239c1f12ea", null, null, 3.372999, 2.450938, 4.161639],
      ["12bbfe2ef33968410dc7c199625ce84df76de82e", null, null, 3.372526, 2.449366, 4.145652],
      ["f3398f648c5bf22458b87b5c5a7688979765015b", null, null, 3.373155, 2.448724, 4.159741],
      ["01f794772ebe12e8c59160c1cc6d323f07a17d4b", null, null, 3.388716, 2.447356, 4.157551],
      ["592b106744b8888b6802561dfb1bd5d0b38d4b43", null, null, 3.397420, 2.498142, 4.177687],
      ["c669012f1d05a79614ea5762c7c7748849d26fdb", null, null, 3.409753, 2.494966, 4.177659],
      ["d9bea19902295d584914eb1a588020ed9b0c54c9", null, null, 3.413015, 2.482636, 4.191814],
      ["80e927e7b5e95b728092daf91ba62e42b9053e98", null, null, 3.404508, 2.464561, 4.208573],
      ["08e959c14b90b8507b9ccd42d165ba2d45a2b4f1", null, null, 3.383826, 2.444092, 4.155613],
      ["66fbfde0e024c7462126dabbcaf40492ab4af69b", null, null, 3.391393, 2.459407, 4.169599],
      ["cece178602d87f04b70d1126f7dc8684d273725a", null, null, 3.375776, 2.443057, 4.166286],
      ["79ed7ab95aea3af33c3eb2e40dac38ea8b9edd0d", null, null, 3.369318, 2.455881, 4.155988],
      ["34324cda6382520d87a8b12f8756ce291c523249", null, null, 3.389426, 2.446095, 4.168191],
      ["803a1e34566db9284451bda0a60bc97ca9d535e7", null, null, 3.373488, 2.447734, 4.175015],
      ["5e1fcc440a7c413c902a6bf8d23ad5278dc99a74", null, null, 3.388223, 2.462079, 4.172446],
      ["90da3b1aa8ccd2e70893539122055a970c6a0112", null, null, 3.369852, 2.433170, 4.165103],
      ["9d29f3cfc9598bac8c2dfc74cebf35973407d53f", null, null, 3.375709, 2.432685, 4.157755],
      ["f296a8400b8fe069aaee7ec0cf38c9f7eaff3b86", null, null, 3.408446, 2.442644, 4.159905],
      ["3b61caca996538e24e051484f5c4c729c319f5b5", null, null, 3.378740, 2.446075, 4.154357],
      ["3dfb19dd124b05e70d741c9834b02e81775eb83e", null, null, 3.374147, 2.433200, 4.168372],
      ["021c643ab3ca6f49d89c201b830cb7f84ad13598", null, null, 3.382248, 2.444008, 4.163469],
      ["3c62c85202bc03a4c24a666cf9b5c822d9854509", null, null, 3.384326, 2.456229, 4.153915],
      ["050ead66ee98abbfba639fd5ff7eded53c630455", null, null, 3.391251, 2.450174, 4.166621],
      ["c2a69ca522f0aa6dbc8bdbf55a87b0a2ecd971fc", null, null, 3.394240, 2.488690, 4.164327],
      ["b984997760662c7b4d050aaaf66348df4535c6e8", null, null, 3.400854, 2.444937, 4.143010],
      ["120528369c7393c597955cf04363de049171bcf2", null, null, 3.394592, 2.470610, 4.176218],
      ["a5b9b425739d30b853085d099974764ee5c5b919", null, null, 3.417348, 2.497213, 4.135078],
      ["787f1d597a6d9a6a47023fd52c5386d657cc180e", null, null, 3.371844, 2.449559, 4.165750],
      ["eededaf101597e6a89950c8b14c2238043f909f1", null, null, 3.373005, 2.452242, 4.141430],
      ["948235fe7734c32ebe63130079e8775d7ba2705b", null, null, 3.384861, 2.477284, 4.133059],
      ["7fbcd18cd2a32ff3991847f3a7be5d3d25f440e4", null, null, 3.376752, 2.439000, 4.147337],
      ["ecf72458ce0cbd53fc6990b1945008c9c09d3097", null, null, 3.371745, 2.462477, 4.134991],
      ["ef17f66af6c1569aa9131523c58c9106627b1ccb", null, null, 3.391283, 2.479770, 4.133682],
      ["c73b2b49a2f5a5925c73d5c20b1254f770b511e5", null, null, 3.371320, 2.435416, 4.120948],
      ["791baebde5b9843392bd3e12b2417775c342607e", null, null, 3.364361, 2.439484, 4.135557],
      ["02c8db0746b843aabe3591f0ac0d3194102dbd65", null, null, 3.367086, 2.450636, 4.133836],
      ["2ecabe929529036c50cb29e51e98656cd4c1191e", null, null, 3.426602, 2.443442, 4.152191],
      ["4b68fd82518f93d31bde3a0d2f877caa967328ce", null, null, 3.375576, 2.447898, 4.117739],
      ["67b11b9075b656ad732b9f11010e7a6529220ad3", null, null, 3.373322, 2.450911, 4.130094],
      ["97ceb11b519e3da70a7f4dfea9a0b0d6bf3a4135", null, null, 3.385565, 2.448850, 4.121511],
      ["85c2391ea1d5d35ddfce4347e08bcf5ad6ebf23d", null, null, 3.393762, 2.438625, 4.139237],
      ["9922595ee238746ee8ebf6c82fa45f4bf2688d9d", null, null, 3.376781, 2.461837, 4.122396],
      ["0f98780d98491c40f16a5d66ca063f9adf95b6d1", null, null, 3.379936, 2.438224, 4.145989],
      ["cb4576205f40133e6240dcadc61a2be8cc8b0dd2", null, null, 3.383140, 2.452794, 4.146494],
      ["b498a1ff80078d69d166863c2b73ab96778557aa", null, null, 3.375569, 2.443811, 4.159419],
      ["88dfdaed5dc17c70d0d871abdcede8b4fa9e7925", null, null, 3.381701, 2.447041, 4.148097],
      ["271a1ac1a4edac819e97edd2560cfb392bf4008f", null, null, 3.393978, 2.438406, 4.124370],
      ["e03cc849ca6b937913451f17766ffa0498967172", null, null, 3.382511, 2.438884, 4.152171],
      ["a2bbca668dac9dcfbf55dad2887d2d2569bae2f7", null, null, 3.376544, 2.469733, 4.137337],
      ["46cc97f1ebe843e93825fbf8245d2dd2592a3a73", null, null, 3.410317, 2.445527, 4.150124],
      ["c9f0febab1c59100a6b043cea41a011945e2e555", null, null, 3.379966, 2.472316, 4.172507],
      ["38124cc098106d576524f80f54172e6dcc019ba7", null, null, 3.367375, 2.444692, 4.168881],
      ["5bd96365ea66d1e31434fee57a23776d59b0134f", null, null, 3.371760, 2.455825, 4.142805],
      ["cf404e7058d0c326496518793f750f87d88d13f8", null, null, 3.376012, 2.459811, 4.135952],
      ["3c76c311f04c05ca582475beb99199054cb87278", null, null, 3.370016, 2.454269, 4.157296],
      ["9d11c0aeb784038f276fa158db188a9a92f2f72e", null, null, 3.393318, 2.448701, 4.139382],
      ["b4dd2ac496edb75fec7bc4f66dde2fedead23b6f", null, null, 3.383004, 2.447838, 4.106657],
      ["d0c87efcb415df74d35b4d075de908226f014edc", null, null, 3.383180, 2.439505, 4.115547],
      ["342616d897c4fe0ba35e785f1ca597ccfb4d9c73", null, null, 3.361342, 2.437666, 4.115183],
      ["d0a90ba902a725f87e8e6a85cea75c5e1d5dbcfc", null, null, 3.393530, 2.432988, 4.144498],
      ["244c054765a4481964be70031feb152e4de487da", null, null, 3.369481, 2.453924, 4.124592],
      ["f3e758652242921f06dfc7e8e833bbe4620dd98e", null, null, 3.372571, 2.434514, 4.146761],
      ["93ec377cf7cee12ee0a88ec1fbf14fba2851693c", null, null, 3.389418, 2.437845, 4.170100],
      ["8922d47fb623a555e4cce2d58934a0b5f5a4a30d", null, null, 3.383234, 2.434587, 4.151629],
      ["5c5a80cceaf45a1c42f66e1e22d88d0b608ba0aa", null, null, 3.376097, 2.439530, 4.110586],
      ["2cb32d9deaa8ee7109d2a985e13c7942f5853589", null, null, 3.369464, 2.441511, 4.154448],
      ["f5ff4c1e16a3ea12f47d7287567314d3f128487e", null, null, 3.365595, 2.445619, 4.109026],
      ["4df1434d9e481c86ea893495bd3c125f2e0f44a5", null, null, 3.381867, 2.436847, 4.129170],
      ["2492ce8c639de27e9995fbdc696be6dd655d2cfb", null, null, 3.378104, 2.439621, 4.109741],
      ["0ae97c47213e178584429afacf7b2547dda25bb0", null, null, 0, 2.465297, 4.112984],
      ["ab1597ee20db6afcaf733c8d4df08de560eebf64", null, null, 3.376278, 2.452892, 4.118869],
      ["3855198029470f1dbf9aecf5b5f96dc21a156c2f", null, null, 3.378566, 2.468009, 4.112814],
      ["3c2d3a683b84aa69d78b002e4c197ac2f4a9e768", null, null, 3.371216, 2.451496, 4.114492],
      ["13a98823f0785bd604e1b1111b11d66e5c3662df", null, null, 3.371756, 2.467337, 4.137275],
      ["cb06abb26ec75d10f2e47365e2142cfec3d38667", null, null, 3.371908, 2.445979, 4.110945],
      ["9608148b1f34c73e7d91893e643ee922bd4f0bb2", null, null, 3.431455, 2.465980, 4.169697],
      ["6c5e914d85cca9a9447148b47ecace09ff37a4d1", null, null, 3.410944, 2.463171, 4.208605],
      ["accf1469b51e35d5dfddb0c799c50b68c495681f", null, null, 3.411456, 2.459286, 4.181567],
      ["69ea39418aa9a241857237aba985579e295b6bf7", null, null, 3.419907, 2.465325, 4.165896],
      ["29c3e83f2faf1a27b988bab0626b361e8e9a238f", null, null, 3.422150, 2.466016, 4.171864],
      ["fa1ecc4bb2bec7b5f5430a7b985340796988ee84", null, null, 3.416602, 2.470124, 4.191182],
      ["02e799d990e7a89ffa86411572d739218e57d031", null, null, 3.429096, 2.504419, 4.201781],
      ["e188c6f551c2984ae863d1307a4781e571855e73", null, null, 3.432633, 2.468202, 4.220917],
      ["398906bd89f9919552eed244ad2c0b9f073ed81a", null, null, 3.419122, 2.489840, 4.205337],
      ["864b741a896ccc1e4ba2fe2b7366b91dedde46e9", null, null, 3.419050, 2.475661, 4.224925],
      ["7bdb00eaaf248cbd74f235513326b19174394f17", null, null, 3.422962, 2.467400, 4.191271],
      ["e31b594d79ed94d2da87119c3f5c6ed60baee178", null, null, 3.430546, 2.461133, 4.189068],
      ["be0ae2b6f345d5533cee1297c72b7f55a0cf535c", null, null, 3.405376, 2.469362, 4.222262],
      ["e40c3ae722955952511ba6ce60ae271657ee0dae", null, null, 3.419929, 2.463213, 4.228332],
      ["dd489ddcd58ee6f4f799bca6c2f6bedcf1264e69", null, null, 3.401878, 2.478947, 4.192330],
      ["07c77127a700f49799933a6fc3fa1aa5ad5e2a1c", null, null, 3.431828, 2.483441, 4.200928],
      ["8d94db1aa6ee6b8e84c7afff1db7894a303f06fb", null, null, 3.436611, 2.463494, 4.216776],
      ["7900108972268d580f31c0157112206efc3d8028", null, null, 3.406970, 2.462535, 4.195542],
      ["e8cf444412eb9063b6117c7a46334009603e7335", null, null, 3.420837, 2.462999, 4.206206],
      ["5031363fbf4a05cb779319a8886437150ae6cd4e", null, null, 3.422489, 2.462190, 4.192160],
      ["73e6b835e9d4f183393ed1f3c28c0de710165c67", null, null, 3.448530, 2.474781, 4.228883],
      ["2614c541563cd9cfb3e2f4003784ada4066d847f", null, null, 3.416183, 2.464766, 4.198776],
      ["7d7175defaceba131e03bc4b1ffc73012cfe98e3", null, null, 3.410865, 2.487102, 4.192813],
      ["e2e3024699c9569cdf75c9f916ddd1ca9347cd46", null, null, 3.403864, 2.472878, 4.181911],
      ["84c84c42a4c09cc4b0bd3cb90a5717727634f423", null, null, 3.419543, 2.466621, 4.188022],
      ["90f201ccdcd764aee1b51eaab44d03976513cc7a", null, null, 3.409237, 2.462857, 4.181515],
      ["b81187f8e7128b432a684334c7a71aa6b0847390", null, null, 3.404493, 2.469129, 4.187888],
      ["e4f07b0e7e9df0eda56db34e93415858a9735fd3", null, null, 3.412915, 2.479310, 4.188517],
      ["720a095370edd04bfb6689cdf5e07e846dbf42cb", null, null, 3.415351, 2.460416, 4.196359],
      ["08ca63a3959efeb149cec6931b8dedecffa6c624", null, null, 3.406785, 2.484412, 4.174979],
      ["4e160506c5834bf1991b1a717ad48280a2dbd56a", null, null, 3.410153, 2.474941, 4.191427],
      ["846602a76a5e496a6b60257065184299b5db9f88", null, null, 3.271459, 2.315252, 4.023805],
      ["cd149d2730988dec43fa0f5238b263b7d98af38b", null, null, 3.229680, 2.292136, 4.013083],
      ["447342780807ddabd48b854627af2f2445db29b7", null, null, 2.962129, 2.021868, 3.716301],
      ["a924f1aa0e4ddeb0a200df607957d160db07d31f", null, null, 3.401837, 2.465051, 4.191990],
      ["38f2a59dcf60d9e5520d95eb54c8555f09308e6f", null, null, 2.966708, 2.011762, 3.720341],
      ["cc92da1ed30ef979c633113f8b436707d337bf03", null, null, 2.967511, 2.026299, 3.723113],
      ["75ad1b0463146696be580ddb061fe4f3124251fd", null, null, 3.425921, 2.461033, 4.183485],
      ["7b25302f0c7ce50a74f6fe4c0d0486046501b082", null, null, 2.965658, 2.016821, 3.745114],
      ["e37a611763a64405af5f25d68744f14e05435e6f", null, null, 3.432558, 2.469488, 4.167366],
      ["5568af3bb0ce034f73192d35648c4bf859c89b12", null, null, 2.958548, 2.025064, 3.745838],
      ["f626d77f1177928ae2e4878a677edd290ed661a4", null, null, 2.960301, 2.029338, 3.755446],
      ["3e7572f56274b22c6d12c4a9904589604634d3ab", null, null, 2.967340, 2.016821, 3.749741],
      ["19837b6b56dbabef673defbc942443787af8e580", null, null, 2.972394, 2.019595, 3.751082],
      ["059cd50158c696a021d9efdf3e9ef92d90dac5ca", null, null, 3.018297, 2.022996, 3.748312],
      ["65c3e69e9375ef571668de7512d6201827554426", null, null, 2.973592, 2.022361, 3.748559],
      ["91dc40b95b5715b903cf6a68270476b1a9f0dbd8", null, null, 2.985852, 2.023497, 3.750687],
      ["f50330594c1bf38067e40d42a853a350cf7c7d22", null, null, 2.966161, 2.021342, 3.717740],
      ["b0b09ab51194239e4ef4364165d7c96d09e390e1", null, null, 2.964912, 2.030856, 3.754623],
      ["25fc6567630de415b7863fcbc413640e8d5e1836", null, null, 2.968455, 2.024658, 3.744916],
      ["b29602da3e3e767ec968b8cd9aa79f2d7d8b22e5", null, null, 2.971299, 2.020640, 3.732414],
      ["1ad63c0bb0bf51fca2b878beb166818515d70ed3", null, null, 2.966147, 2.040306, 3.724233],
      ["4c0d6d5bd972b93fc9db1ce6fcb83268caf5b6e5", null, null, 2.966338, 2.017422, 3.725272],
      ["e33613917a615366346ce0710046723be41d688a", null, null, 2.970179, 2.016712, 3.719732],
      ["c5f6946203addda873ee473ece3479dbf9bec2af", null, null, 2.983822, 2.020542, 3.720929],
      ["39afbd583b6193772b03b6b9e9dc5e39c4ab4cbb", null, null, 2.969040, 2.023860, 3.721124],
      ["6023b7ecebd6f1b656ad11d9f51fedda01cdf15f", null, null, 2.964539, 2.012575, 3.719941],
      ["7a0a34c632414df081cd16bba3e0d59bc14e4e65", null, null, 2.975127, 2.025977, 3.723680],
      ["d6e949e989496e124092273b6ab4e69f92f9c2e2", null, null, 2.971710, 2.014317, 3.727408],
      ["443766d199be405349466afb0fce42ff33b9efd7", null, null, 2.971018, 2.017154, 3.729418],
      ["c44c80bb071cc1cfb8cad70b078cd9d88cf21a19", null, null, 2.965927, 2.085084, 3.730923],
      ["264d9b1ec5037f5ce89f3db6a564304b1ad3496e", null, null, 2.970820, 2.026575, 3.733275],
      ["0843765b7aaaef4e29dfd32f84b94bd336694f1d", null, null, 2.971056, 2.020613, 3.751976],
      ["206b625d3844c36f5f7bc9b4d1fb911daf90ea9d", null, null, 2.974799, 2.024329, 3.752738],
      ["e1c6a2c18d848ac888db8df4f22795201dcb9d8a", null, null, 2.969356, 2.024046, 3.756294],
      ["89108c0c3e4ea0c97072d6a73612111db1be95dd", null, null, 2.975955, 2.023907, 3.750235],
      ["0e86170d2723b756433654a6faf236faca9034bc", null, null, 2.966366, 2.025738, 3.720976],
      ["cebaadb9a1cd3cb5991b4a53f01edb40ef8cea1d", null, null, 2.979919, 2.021649, 3.723353],
      ["7d9876c310fc1e3c91a113c138bee2fc9b8cacb5", null, null, 2.964734, 2.036793, 3.752784],
      ["c62768f270dcfcf4bf8fce2a13c2a4986a07e4da", null, null, 2.968237, 2.027751, 3.745288],
      ["18105f62bacf8d25bcf06308ac7e4e886bae47b1", null, null, 2.967468, 2.020005, 3.746565],
      ["99c4618bfe32dfd9caee6287c1d96e45e3a6e0b2", null, null, 2.970008, 2.022417, 3.751997],
      ["3c4f402a22ddf0df1aa84c4e9b89306784a5852b", null, null, 2.962860, 2.016578, 3.743910],
      ["ba8119f7c7e49092f9e7bd70b5c73dd2cb85097e", null, null, 2.964723, 2.011412, 3.720742],
      ["b8d943e4a4b7107b6d7221e012a1b8d03bda6d7c", null, null, 2.973731, 2.028645, 3.751517],
      ["b83bccacc320877c952fd23dbc231c48ebc2096b", null, null, 2.965543, 2.020035, 3.754843],
      ["d4ad35740ed13c09ddecdd9b4dfbd9735a7006ea", null, null, 2.962838, 2.018163, 3.724021],
      ["f4c0a21171fec31cee24dfd0834c6760f6f780ce", null, null, 2.965072, 2.019965, 3.750775],
      ["564c277a0ff0b3230e824e93d410a53e06995ad1", null, null, 2.959476, 2.021491, 3.746678],
      ["4c05a3435346fdb90699c310deac12abf64ca151", null, null, 2.966509, 2.023210, 3.748340],
      ["1e56553ae2fd86df53006490f664154438f74267", null, null, 2.963831, 2.017139, 3.740130],
      ["6650718bcae611b7722d2c2dacee37aa33fa5319", null, null, 2.957795, 2.016136, 3.740518],
      ["a84d8771994fc4ee4a4661c6a6be011c03185ccc", null, null, 2.961467, 2.019988, 3.746856],
      ["fff69a7f78490a4c25b2431d8ed33df7d50aa336", null, null, 2.960490, 2.027357, 3.740281],
      ["f83ba727c170639f9efb0dfaa5159b00487e263d", null, null, 2.957380, 2.022456, 3.740356],
      ["f91281e7d95b0140fd957b9dadfe1b485d1ffd2a", null, null, 2.961492, 2.017142, 3.715778],
      ["24a05c2bbcb6972df4047f7a1332737cacfbfa96", null, null, 2.964194, 2.007934, 3.724442],
      ["fa534101f73ffb469e045644683e9d91aa9f0c22", null, null, 2.960066, 2.017654, 3.714708],
      ["376ec39f99f194a4e116763ba2cc6234445d014b", null, null, 2.968660, 2.013825, 3.725117],
      ["c67cb794cc95e9e6517089b45a27b535366f5ea1", null, null, 2.985443, 2.018516, 3.747565],
      ["eacd08a55a7a55a99f37480e3587a11b3e99decc", null, null, 2.963644, 2.025092, 3.724415],
      ["bb3bb126d016ca910d0f6e5ae77b98309ff48196", null, null, 2.959822, 2.018071, 3.716182],
      ["87cc25ec06ab4228e1913518fe0b3d788f9b5494", null, null, 2.967945, 2.025708, 3.717279],
      ["b31f1c4d3a86a822462b57eb8bd71a0c351b9387", null, null, 2.965595, 2.020228, 3.722413],
      ["1e8ee0f72e01a3ba2ff056ecb6ff83a781367ebb", null, null, 2.963074, 2.011984, 3.725706],
      ["e5283addb9cd932c10cd53687f4e4905238a0aeb", null, null, 2.958336, 2.016854, 3.721910],
      ["4e1c9a74e9917ee6ffec99de406db91ce4c116e2", null, null, 2.973316, 2.024078, 3.717697],
      ["a9814bc0c155762fbef0cfdf778fb610808e4078", null, null, 2.970298, 2.020455, 3.713241],
      ["308a1a4f74c7c86001a37183e870dbe3ec6e583a", null, null, 2.957707, 2.024121, 3.713376],
      ["3165aa89efe746cb0aed7e8b0ef65f580a9ae79f", null, null, 2.960797, 2.015287, 3.716353],
      ["7ed6df2f3762faf6875e5c3d80a807391a41869a", null, null, 2.960449, 2.012286, 3.716940],
      ["635fc518bc645bb1e80c6b8b47888687ee3b4c0b", null, null, 2.964717, 2.017610, 3.717038],
      ["e74bf923e0b9608b47c268852668968fe3d9a1b4", null, null, 2.960105, 2.013686, 3.722889],
      ["52bd18633974f2f119e9b99420bfe201cd622fef", null, null, 3.024687, 2.081073, 3.779906],
      ["a8af9e99c892599ba03267ba09df282542e1ca3e", null, null, 3.014810, 2.058585, 3.765133],
      ["f5b77a390e12766160cefb8d1cdbdcd71a3e9d59", null, null, 3.001102, 2.058149, 3.761627],
      ["5ceeec4638f5029243cce12465094cf8d4ab59c4", null, null, 2.996342, 2.058766, 3.764098],
      ["c9be2a33dec91c0dc7f95128256a11b8ea6856ff", null, null, 2.997805, 2.055842, 3.761751],
      ["27af74b99be47f53c2fbf9be3538790896ce5264", null, null, 2.963405, 2.015402, 3.735280],
      ["952f3df6afa27e6e93786f8be59d6b158cef6e1c", null, null, 2.964241, 2.013341, 3.737783],
      ["4f40cdc39c136c381dc5ce951b5f244dc0c81603", null, null, 2.957291, 2.024651, 3.745441],
      ["a8243dd366ab0e94ef8db1c02a009bf2fa5f3f64", null, null, 2.953039, 2.014701, 3.741622],
      ["8be3615955b18454792f66130b4238b1d34ee7eb", null, null, 2.961138, 2.018211, 3.739120],
      ["159d5f38e58e1738e551fbfa32ef0ba85c40d1f3", null, null, 2.955126, 2.009852, 3.747559],
      ["7c81685d4b1b179312b872dc918c6e0f98db9486", null, null, 2.958990, 2.017443, 3.739120],
      ["338569455cf55315915513bdd06451c6cac45f01", null, null, 3.006395, 2.056413, 3.779590],
      ["90d786ce2f1f73f4b3a38d9df4cfdb2f3653eb5f", null, null, 2.996402, 2.055301, 3.784831],
      ["15ce31f9948593cacf251be3e05eb01ef9d9c86e", null, null, 2.999644, 2.053916, 3.782821],
      ["fcfeb12db2bea3535489cd1d432b1249237052c9", null, null, 2.969830, 2.027432, 3.764273],
      ["822de236f764747eff02fdc86cd7a462f248a28d", null, null, 2.975003, 2.040501, 3.758824],
      ["595c1f44e58f043e7c005116931a037112984f3a", null, null, 2.968736, 2.027144, 3.736041],
      ["48e91ae16f914ad204c8509c2af65e8cb87a60d8", null, null, 0, 0, 0],
      ["80340e87ac1c764555f26a16d7ac4dfd39b66313", null, null, 2.868917, 2.213983, 3.403983],
      ["214a354b219f351a9fb16e87a067bbf29dda1a2c", null, null, 2.955770, 2.022342, 3.745777],
      ["86ca7d442f50bcbfdfa91c9338821b437041a353", null, null, 2.967951, 2.023495, 3.739375],
      ["f116277043ebad7c0814d7b1a3e1d75f2ddece39", null, null, 2.869251, 2.226534, 3.407933],
      ["497d967ce5727f6ac41380a96904e95f6d14c5ba", null, null, 2.895776, 2.223309, 3.411666],
      ["d4b298b37b83733490f70807991fdf0b44eb1a62", null, null, 2.860245, 2.218334, 3.407665],
      ["23ee5265e48e941f5a5e0a11ebf28362ad238f60", null, null, 2.868802, 2.232132, 3.417772],
      ["6cb0bed424e9e0dcb6b8c8c2a0d1b521540c0067", null, null, 2.874342, 2.226392, 3.418615],
      ["13f1ab693ca056698a370c65b8d139faed782261", "B", "13f1ab69: fnmatch() regression introduced", 4.878608, 4.218127, 5.385777],
      ["b4fc0ebf751492157307a86e3e54bc56797419a5", null, null, 4.898393, 4.231434, 5.384382],
      ["4f397d55d895c4b16b64e2f25edb9369b26ff895", null, null, 4.885928, 4.234113, 5.381661],
      ["c6c12ea45f615b7bd65c365c9a00ab11e904a168", null, null, 4.880621, 4.226011, 5.403185],
      ["e74f530212122db9acb442ee968a1a88d7f305f7", null, null, 4.890227, 4.274430, 5.423606],
      ["6e7f003bb604b8f6088cebea12b46b8c9ec78649", null, null, 4.864558, 4.231431, 5.413614],
      ["b16dbe3f0537d34f1029594c030ff95556c77196", null, null, 4.892476, 4.231853, 5.441920],
      ["34880f08f1f3def76be0ea9243df20dec3f9ae16", null, null, 4.858992, 4.209518, 5.389819],
      ["33a55ffb20c45820f0d5a6b4826f098559e0edf8", null, null, 4.856703, 4.241104, 5.393429],
      ["4eb42b8dc1e8b05acfa99e941134c67ee5152e59", null, null, 4.872827, 4.230502, 5.439097],
      ["13913f9ef61b04d956355b4a8fccd8efec1255fe", null, null, 4.873595, 4.213172, 5.388901],
      ["54e9b6b72f34090405fa8f9e05ab22654f9d662f", null, null, 4.861767, 4.228409, 5.396831],
      ["6d0984db41f267c17d0db058b3359e4eaa21a118", null, null, 4.880563, 4.214223, 5.422132],
      ["3e77e1d18597f04b3eeb93d78f593bad9834c889", null, null, 4.870204, 4.272354, 5.379283],
      ["aa86691e80d2222df1d86b99f949e999c47e0eb1", null, null, 4.853161, 4.241235, 5.421133],
      ["8f9cdbf3fa2f036392fce5dba47b85a71fad3c90", null, null, 4.891256, 4.207941, 5.442550],
      ["104fe8d8b080a218817dc38aa6be134957a7de76", null, null, 4.856949, 4.211376, 5.423370],
      ["b8bd824738e7c2fa2d6acfc805c1bb90c013be83", null, null, 4.872618, 4.227344, 5.418222],
      ["c8b365128f675da4d130cb65fd7aae07874f7918", null, null, 4.851715, 4.220805, 5.405464],
      ["6afc39bd33cbd52cba9289803a98a015a2bbcf0e", null, null, 4.856479, 4.210009, 5.413883],
      ["c8b3618b0418b3db8a146dd5ace2358df49de8e1", null, null, 4.854431, 4.243737, 5.385381],
      ["cd0c5cef973edc8ab8df1c1094cb6c3113975951", null, null, 4.864728, 4.253148, 5.053614],
      ["74109d313e374ee25d56bf338c6f7ea01e23a731", null, null, 4.865456, 4.235324, 5.055610],
      ["bda63b3e0af52568042594e993b6bff1ccc0b363", null, null, 4.876063, 4.226347, 5.064623],
      ["2c53cd151ecc4f2b529861913daf121d202e00e2", null, null, 4.860514, 4.221549, 5.055014],
      ["00c7af7d090950656fd17ecad2e75f57117bd3b4", null, null, 4.875544, 4.204118, 5.054620],
      ["935a262e1589b3ddc4ddc673dd07bd8f91a3f7e6", null, null, 4.866946, 4.219988, 5.044345],
      ["8e92201e4f0c8c1012bbbf44db86711f39851309", null, null, 4.858317, 4.232918, 5.381403],
      ["472658fda7f3a95f1fb9da9307729f17e9083bf8", null, null, 4.874117, 4.240554, 5.389618],
      ["4a486c90663e26ffff574a78fd317716684932d7", null, null, 4.885643, 4.213927, 5.041719],
      ["bc6af40051b1187ab6b52d23d75102e103857e28", null, null, 5.064326, 4.429129, 5.250805],
      ["34e37e1899c7c5f0fd7d71308218de8e1c635cb0", null, null, 4.866615, 4.205846, 5.048588],
      ["f086b7e79f811b9fdaa975774937d7ea1d0d1b72", null, null, 5.078002, 4.411902, 5.253474],
      ["161af74112c5a7674a08e99df7161424eeae10a6", null, null, 5.048926, 4.378018, 5.223259],
      ["2f042fb3525d0beb24841e1e0c00c45220bebc9a", null, null, 4.870644, 4.225939, 5.070287],
      ["75a62f263e39115c9c92d50b25782ed7386f0329", null, null, 4.880838, 4.226183, 5.078816],
      ["9bd65603cddf27ffe161fc590af922265eea3f41", null, null, 4.875169, 4.236619, 5.052533],
      ["8a566091e734427b291cc5832f7612ad76443b36", null, null, 4.887272, 4.216758, 5.040767],
      ["0737a433b7ec8092633860f5d3d7c290af74bb0c", null, null, 4.889106, 4.213205, 5.047751],
      ["62af73766403aebae50cda75bf908ffc7553dee7", null, null, 4.887563, 4.220549, 5.046889],
      ["7e5e7ba43cb3044e0df3008cfb4c2fe9a846acc4", null, null, 4.907754, 4.210485, 5.057654],
      ["43886f9b08d0772b54f21a291a0794d060f700f7", "C", "43886f9b: Fixed f_len regression", 3.894417, 4.203158, 3.909279],
      ["5e99d25ec226480800baeb455779734a1eaa5c2f", null, null, 3.871041, 4.217923, 3.924350],
      ["2531de37ccd021569fd53929e5a01c34a9355041", null, null, 3.884597, 4.390047, 3.915709],
      ["e03fc9a4d3d94e5d3e2a5bbb1ed6c9fb2b50c7bd", null, null, 3.880306, 4.217733, 3.902666],
      ["c862a82f12c6a10192198cec92d11c0d01b82e4b", null, null, 3.886981, 4.233464, 3.915429],
      ["99355a71c9745c5abe950bb0c3863dd2aa4677a0", null, null, 3.881602, 4.219853, 3.907431],
      ["e93290ca24bc86eac02a1056cf57330b3725242a", null, null, 3.889347, 4.214918, 3.917854],
      ["f6199062f0ebf1e83802ad76f1dc0f621b0549e8", null, null, 3.892026, 4.238733, 3.887202],
      ["bdc04e76f202bbfe39fe77356e30c29b27e5032c", null, null, 3.940819, 4.286703, 3.974053],
      ["8a843843e83c4cad8f53daa7e5b9564107ecd11e", null, null, 3.938665, 4.293881, 3.972416],
      ["227ad6ee106d0db55753caf68902b97a2d416408", null, null, 3.882248, 4.240623, 3.890136],
      ["f8a58c06106cee7222bfd8ba084dd3e788c33d65", null, null, 3.904567, 4.204908, 3.890956],
      ["f4cdbeb8e7aac3853687fbf653974bd610d462e5", null, null, 3.878047, 4.199441, 3.892196],
      ["ee0e507c67cabebe03d1f07b7b0d6099c1242979", null, null, 3.922079, 4.220613, 3.918369],
      ["b64de8fbbf9f2ec35a4ab7f3369431f79c483217", null, null, 3.929699, 4.278663, 3.945001],
      ["5e9a49fcb1f998acd573eef42c40cbc312c4af3b", null, null, 3.955884, 4.265117, 3.959516],
      ["4e73903f7033ae0808cc00a217c4608dd8da4931", null, null, 3.944441, 4.271839, 3.977377],
      ["a87aa8f822d9029243423ef0725ec03ca347141b", null, null, 3.981451, 4.266946, 3.959043],
      ["e344ca087099431c1bcf733b3ae28316f6932683", "D", "e344ca08: Fixed fnmatch() regression", 1.948765, 2.282791, 1.950637],
    ]);

    // Set chart options
    var options = {
                    'title':'Ag benchmark',
                    'fontSize': 20,
                    'backgroundColor': {
                      'fill': '#eef'
                    },
                    'chartArea': {
                      'left': '10%',
                      'width': '85%'
                    },
                    'legend': {
                      'position': 'top'
                    },
                    'hAxis': {
                      'title': 'Revisions',
                      'textPosition': 'none'
                    },
                    'vAxis': {
                      'gridlines': {
                        'count': 7
                      },
                      'minValue': 0,
                      'title': 'Seconds'
                    },
                    'width': "100%",
                    'height': 500
                  };

    // Instantiate and draw our chart, passing in some options.
    var chart = new google.visualization.ChartWrapper({
      'chartType': 'LineChart',
      'containerId': 'chart_div',
      'options': options,
      'dataTable': data
    });
    chart.draw();
  }
</script>
