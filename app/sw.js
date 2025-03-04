if (!self.define) {
  let e,
    s = {};
  const a = (a, i) => (
    (a = new URL(a + ".js", i).href),
    s[a] ||
      new Promise((s) => {
        if ("document" in self) {
          const e = document.createElement("script");
          (e.src = a), (e.onload = s), document.head.appendChild(e);
        } else (e = a), importScripts(a), s();
      }).then(() => {
        let e = s[a];
        if (!e) throw new Error(`Module ${a} didn’t register its module`);
        return e;
      })
  );
  self.define = (i, c) => {
    const f =
      e ||
      ("document" in self ? document.currentScript.src : "") ||
      location.href;
    if (s[f]) return;
    let r = {};
    const n = (e) => a(e, f),
      d = { module: { uri: f }, exports: r, require: n };
    s[f] = Promise.all(i.map((e) => d[e] || n(e))).then((e) => (c(...e), r));
  };
}
define(["./workbox-e8110d74"], function (e) {
  "use strict";
  e.setCacheNameDetails({ prefix: "sisa-uang" }),
    self.skipWaiting(),
    e.clientsClaim(),
    e.precacheAndRoute(
      [
        {
          url: "assets/AddFormContent-C1kAPEH9.js",
          revision: "1619bf153558048e2ebf835ac0114860",
        },
        {
          url: "assets/AddFormContent-CA5eJXzj.js",
          revision: "c1b99f3043868c9e51d92472c3e4a213",
        },
        {
          url: "assets/AddFormContent-D31ZmVRI.js",
          revision: "a35ac2e43d046aafc6a7d51772a63064",
        },
        {
          url: "assets/AddFormPage-c5lXPnoJ.js",
          revision: "b88e0980fb60401efd526a8493913c59",
        },
        {
          url: "assets/AddFormPage-DAf-A8Px.js",
          revision: "6b04d2177f0049ce7ad006289326bbb4",
        },
        {
          url: "assets/AddFormPage-w_VH7R-4.js",
          revision: "609d8ee69acecb604a63c462e5a72e36",
        },
        {
          url: "assets/axios-CqY7riin.js",
          revision: "9776aa442788974a8edcbfe5b6db806c",
        },
        {
          url: "assets/category-store-BO763lWl.js",
          revision: "a1e38d10b1cebaa0b6f425cae1f57223",
        },
        {
          url: "assets/ChangePassword-DJAdYQwP.js",
          revision: "65696aaf506ef2b7e3562bd706c01cf1",
        },
        {
          url: "assets/cleave-zen.module-Cq8K1Kdq.js",
          revision: "6af42e9e4e3bf73fa43aeb2b964c4ae8",
        },
        {
          url: "assets/ClosePopup-D1y-OhW_.js",
          revision: "36cbd02f45d57a73ef06eb73d2a71ddc",
        },
        {
          url: "assets/date-cGZxelJU.js",
          revision: "800dd8ea4ff3327bd18a24187df6cc78",
        },
        {
          url: "assets/EditFormContent-DLa5k1Dy.js",
          revision: "86284628575b07ded0cc369dac93667a",
        },
        {
          url: "assets/EditFormContent-DncImqx3.js",
          revision: "17a41cf41c772d1d07520e1f7e0e8deb",
        },
        {
          url: "assets/EditFormContent-nuO3r8WX.js",
          revision: "57b321412a6e92df9ed08876b14b0d09",
        },
        {
          url: "assets/EditFormPage-BAPMrqSl.js",
          revision: "1ed7e885e497e457cde4422c60277660",
        },
        {
          url: "assets/EditFormPage-DgT2zeUN.js",
          revision: "c325b76973e6a4a93b5f6fe40f22ab12",
        },
        {
          url: "assets/EditFormPage-QW1R5PfN.js",
          revision: "eb597ce0126fc28c8160af167264f59a",
        },
        {
          url: "assets/ErrorNotFound-D2kWgxOI.js",
          revision: "6714e2a9c4e384cc5165d210d9b012cd",
        },
        {
          url: "assets/fab-8Z6fzLLp.js",
          revision: "a47adddf9d77a44d796d1a9b81ad350f",
        },
        {
          url: "assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNa-Dr0goTwe.woff",
          revision: "3e1afe59fa075c9e04c436606b77f640",
        },
        {
          url: "assets/flUhRq6tzZclQEJ-Vdg-IuiaDsNcIhQ8tQ-D-x-0Q06.woff2",
          revision: "a4160421d2605545f69a4cd6cd642902",
        },
        {
          url: "assets/FormContent-rETFh7oE.js",
          revision: "6b8de05eb4a28e5ed41c672390968334",
        },
        {
          url: "assets/FormDialog-Bj8izeZU.js",
          revision: "075863b064480d8f30a44882da4ad2c0",
        },
        {
          url: "assets/FormPage-B0h7dIr4.js",
          revision: "6fcfa222e9b3828257d81683106af6b7",
        },
        {
          url: "assets/fund-store-C4dr64_8.js",
          revision: "5acbced120fdce2f33fb3f3a6e987fd7",
        },
        {
          url: "assets/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcel5euIg-DZhiGvEA.woff2",
          revision: "0ba49c096a77b67734434cebcaf2e14d",
        },
        {
          url: "assets/gok-H7zzDkdnRel8-DQ6KAXJ69wP1tGnf4ZGhUcY-BpWbwl2n.woff",
          revision: "0e4321a7c0dda51d72a669ac5892fc39",
        },
        {
          url: "assets/i18n-Bs5CgQeJ.js",
          revision: "233e09f8e0de5b21e020fe2e9b62ef50",
        },
        {
          url: "assets/index-B3ERjQ3k.js",
          revision: "72a258488dea57e65ac8cfef2d43b7dc",
        },
        {
          url: "assets/index-C_y4R7fy.css",
          revision: "f915feb203ac5f2a2d26d8d5658eadaf",
        },
        {
          url: "assets/index-Cu8SwIqk.js",
          revision: "180b7cb9a45c85cc09f70b44768d9c69",
        },
        {
          url: "assets/IndexPage-DZDLXFnF.css",
          revision: "b56677ad4fb8f2a52cc6392f14945926",
        },
        {
          url: "assets/IndexPage-xdTXOw2G.js",
          revision: "3cdf66b76b67c14c867d37edcdf88dd8",
        },
        {
          url: "assets/KFOkCnqEu92Fr1MmgVxIIzQ-Y2mpUUkw.woff",
          revision: "d93054bf1c6d3002897ac09e0e7b9a6f",
        },
        {
          url: "assets/KFOlCnqEu92Fr1MmEU9fBBc--ViM7Ag4Q.woff",
          revision: "30ef7351c99d2cd25159e6fc71e6c6fc",
        },
        {
          url: "assets/KFOlCnqEu92Fr1MmSU5fBBc--CrFzpgl6.woff",
          revision: "5001486802025ac686973542fdeeea60",
        },
        {
          url: "assets/KFOlCnqEu92Fr1MmWUlfBBc--CW3_XjG_.woff",
          revision: "064a5568b49ac29f2e9ea88a1f25fbc3",
        },
        {
          url: "assets/KFOlCnqEu92Fr1MmYUtfBBc--Dr8fnyGc.woff",
          revision: "c2818baea5d2506dd4c2843836b9bff6",
        },
        {
          url: "assets/KFOmCnqEu92Fr1Mu4mxM-DAYh6T4l.woff",
          revision: "1ac185dda7da331babe18e8d84ec6984",
        },
        {
          url: "assets/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmJ-BDlwx-sv.woff",
          revision: "9f309e9eab67445742ec147a3e37364f",
        },
        {
          url: "assets/LDItaoyNOAY6Uewc665JcIzCKsKc_M9flwmPq_HTTw-DrirKXBx.woff2",
          revision: "121a59d703f74d7fc4a1bf64580966ed",
        },
        {
          url: "assets/LoginPage-BdtVvs1t.css",
          revision: "213093efe92c82606b20316d68ea8edd",
        },
        {
          url: "assets/LoginPage-e0NIYJdH.js",
          revision: "7baf020e86e4e7e01f7ded41690a6477",
        },
        {
          url: "assets/MainLayout-D2BL8VPX.js",
          revision: "400008ee7cc7f5666b3584aaaf468f88",
        },
        {
          url: "assets/MainView-0LAMWZYt.js",
          revision: "b0f72294d5d67821abd0f62923f7d214",
        },
        {
          url: "assets/MainView-ByL3O4oc.js",
          revision: "31cac32e9cebdf56b6fe2295729b6528",
        },
        {
          url: "assets/MainView-C-kI1nAm.js",
          revision: "e85f5fe2c3b3f1e6d05d717211f89407",
        },
        {
          url: "assets/MainView-C6i7SjK-.js",
          revision: "f7c3d892eb1354be0d7ad286ace3beb9",
        },
        {
          url: "assets/MainView-CVTZ13kW.css",
          revision: "cd97bbeae0e2263e01c1ac6db7551259",
        },
        {
          url: "assets/MainView-D19vW6pn.js",
          revision: "5061961827ae0a63e6c717e9a93934e8",
        },
        {
          url: "assets/MainView-DIsFl4sh.js",
          revision: "79f32248491a2c680f80a1b8e713798d",
        },
        {
          url: "assets/MainView-oIcLr2DM.js",
          revision: "be23396e695cb4d22a3f4fce4e4108b8",
        },
        {
          url: "assets/MainView-sz-Nrhr_.css",
          revision: "050ccc1f0c05a2d614b007fcc4d4a06e",
        },
        {
          url: "assets/ownership-store-ClKIlLOR.js",
          revision: "159197f0a6b66986e8fac5caf76c92f9",
        },
        {
          url: "assets/ProductSans-Black-DY-R_5Gt.woff",
          revision: "f62f26a8af03bb53a0a83dd23a2fbbd7",
        },
        {
          url: "assets/ProductSans-BlackItalic-CLKXNJBM.woff",
          revision: "ef0c4740e420c336c3df028d8b41a105",
        },
        {
          url: "assets/ProductSans-Bold-jaO9kdFa.woff",
          revision: "56831c947d8b6e5fdd01e9ebc4576ce2",
        },
        {
          url: "assets/ProductSans-BoldItalic-CnnmN8Zt.woff",
          revision: "bb2ed9e7721d98afd8652c6a60a31b51",
        },
        {
          url: "assets/ProductSans-Italic-BPAAkfXB.woff",
          revision: "124ecceef2b99a38e7037a6cef9db5a4",
        },
        {
          url: "assets/ProductSans-Light-C8TbQiGG.woff",
          revision: "25097357bda74912851eb5256a4699ff",
        },
        {
          url: "assets/ProductSans-LightItalic-Ck6vJ5GH.woff",
          revision: "7524fd2e8df80159218aaace1720b991",
        },
        {
          url: "assets/ProductSans-Medium-BQ4RHNXI.woff",
          revision: "ec26aae8ba4c449f686b73576f5baf2b",
        },
        {
          url: "assets/ProductSans-MediumItalic-CSzPYeKq.woff",
          revision: "255754fa1966557f15e24cca12b4aafb",
        },
        {
          url: "assets/ProductSans-Regular-B8YizABW.woff",
          revision: "f8c351bf8263f7beefb5c4c444951389",
        },
        {
          url: "assets/ProductSans-Thin-Chk1GYtd.woff",
          revision: "2d7cc69ae28dee37020ddbd4a01d15d3",
        },
        {
          url: "assets/ProductSans-ThinItalic-DFUomZmy.woff",
          revision: "833fe2e55d597e46178eba86e49fb31a",
        },
        {
          url: "assets/QBadge-DSlsNkPW.js",
          revision: "f3e6651bbdf67238d42a97168ab4429c",
        },
        {
          url: "assets/QBtnToggle-vwzQbose.js",
          revision: "96b2fbfb56eaf0f7ec3d4e0194a48d59",
        },
        {
          url: "assets/QExpansionItem-BZD8HUMk.js",
          revision: "d70ae9491e6e3f4bb6e8bb33f3ac2c69",
        },
        {
          url: "assets/QForm-D58aAyhQ.js",
          revision: "c7483253fe54357e0914c6316531c41f",
        },
        {
          url: "assets/QItemLabel-DQm_I84Q.js",
          revision: "723886cbefed5bf4a88c122fcf0a4e64",
        },
        {
          url: "assets/QItemSection-BJxyCnnK.js",
          revision: "09c1500764faa16e7cff775cd046871b",
        },
        {
          url: "assets/QLayout-BwoUn9Th.js",
          revision: "019975b49d70e45d421d15c9343db401",
        },
        {
          url: "assets/QList-CIQEe_Dy.js",
          revision: "50585ab4864e742daa1a70fd6f6a48a6",
        },
        {
          url: "assets/QPageContainer-Bgz-PKOR.js",
          revision: "0187e868a65b808f909f53d62bdde4be",
        },
        {
          url: "assets/QPopupProxy-TDRHj5_A.js",
          revision: "4a0908456663b0f3814359f85799191d",
        },
        {
          url: "assets/QSelect-CyjN6Os2.js",
          revision: "a2f057ec8e7239d46dcf80d0bd604858",
        },
        {
          url: "assets/QSpace-Wdqvg5ev.js",
          revision: "140140b29309189bf451111bf7b52e09",
        },
        {
          url: "assets/register-component-BkAWe4tj.js",
          revision: "26198b43ede6f7764028f836068d94f7",
        },
        {
          url: "assets/register-component-CGhdYa9K.css",
          revision: "fc582593d6df6858df11e40aa9844021",
        },
        {
          url: "assets/RegisterPage-Bh95TznQ.js",
          revision: "a1327b7f33856cf9d2d79685d90f0776",
        },
        {
          url: "assets/ResetPassword-DWpsHSLN.js",
          revision: "7501bfb08b88e89c174c3ef648d39bb0",
        },
        {
          url: "assets/screen-DuuDn3_w.js",
          revision: "08c4eae04d66197cfe05f95ab6bc04bd",
        },
        {
          url: "assets/selection-CIyowABQ.js",
          revision: "23b74c00fdd2ebc9fe6f6a172babd5ca",
        },
        {
          url: "assets/statistic-store-0g_7vJWe.js",
          revision: "8f039597539a5ca4ec11d5c01a1fffd7",
        },
        {
          url: "assets/TouchPan-BZqIsdCb.js",
          revision: "9df5520b6a180b6593e92a692f5263b0",
        },
        {
          url: "assets/TransactionList-U4w_ea1g.js",
          revision: "07b0d6b3ad9df1c2f7899c6d64157093",
        },
        {
          url: "assets/use-quasar-BxvlELHz.js",
          revision: "f1b0b254d7b6f74a642b3d4081f208cb",
        },
        {
          url: "assets/utils-Bi8AkgVO.js",
          revision: "dd29e5e6a74f260c6ed9262da7b4d5d1",
        },
        { url: "favicon.ico", revision: "37a7e52ce6522cbef08c78e20da1aeee" },
        {
          url: "icons/apple-icon-120x120.png",
          revision: "75eff08763fa3fe0e2189eddcc28a6fd",
        },
        {
          url: "icons/apple-icon-152x152.png",
          revision: "8ba774c89a6a4308bdaee765e78637f8",
        },
        {
          url: "icons/apple-icon-167x167.png",
          revision: "26b84cc94d784ec6ae219ccf969d5c1c",
        },
        {
          url: "icons/apple-icon-180x180.png",
          revision: "08c6bcfd01f0df9069e7bc3b181b8fc7",
        },
        {
          url: "icons/apple-launch-1080x2340.png",
          revision: "fbc22306f48b5f81e6965937e34545ad",
        },
        {
          url: "icons/apple-launch-1125x2436.png",
          revision: "4b6c01f58ae389b25a39b8efbcfcd923",
        },
        {
          url: "icons/apple-launch-1170x2532.png",
          revision: "caa9cfc4f047e1fc5f753054461a3ad2",
        },
        {
          url: "icons/apple-launch-1179x2556.png",
          revision: "10066dba76fd523b724bde3906b99270",
        },
        {
          url: "icons/apple-launch-1242x2208.png",
          revision: "723b2a4c4d856bc6dd1f7ffe8cc9d9f4",
        },
        {
          url: "icons/apple-launch-1242x2688.png",
          revision: "3972b67324f1027a785f2a41afc09768",
        },
        {
          url: "icons/apple-launch-1284x2778.png",
          revision: "6dbb0242bb6303c23bd4e1a01dfefc25",
        },
        {
          url: "icons/apple-launch-1290x2796.png",
          revision: "30a07a7d5d2ea4042e224efa3c53131d",
        },
        {
          url: "icons/apple-launch-1536x2048.png",
          revision: "1f95740c933120264075cf333a72872b",
        },
        {
          url: "icons/apple-launch-1620x2160.png",
          revision: "4c11d42ebda9192d8c3f830be3dae708",
        },
        {
          url: "icons/apple-launch-1668x2224.png",
          revision: "55c348a877ee8dc21b94ed9d33a85aef",
        },
        {
          url: "icons/apple-launch-1668x2388.png",
          revision: "2900e05725824ab8da139bd0c7ed6ce8",
        },
        {
          url: "icons/apple-launch-2048x2732.png",
          revision: "f601f7e3ae78a0c9198a16a2c45c611b",
        },
        {
          url: "icons/apple-launch-750x1334.png",
          revision: "5db6878d040757fbb2bd27997d0bfb05",
        },
        {
          url: "icons/apple-launch-828x1792.png",
          revision: "5a9ce2fe74be0f1ef532b963da121e86",
        },
        {
          url: "icons/favicon-128x128.png",
          revision: "d6709c8cbdab16589e612a8a6d2d0ec7",
        },
        {
          url: "icons/favicon-16x16.png",
          revision: "f866e711836c7694df56ea9d827452ea",
        },
        {
          url: "icons/favicon-32x32.png",
          revision: "0ba8af6771a190fec197d201fd6477ae",
        },
        {
          url: "icons/favicon-96x96.png",
          revision: "820c919423aa6b93d06a63d82bcb93f5",
        },
        {
          url: "icons/icon-128x128.png",
          revision: "d6709c8cbdab16589e612a8a6d2d0ec7",
        },
        {
          url: "icons/icon-192x192.png",
          revision: "2764ff46a7d42cc0d7fd4b4e0a85687d",
        },
        {
          url: "icons/icon-256x256.png",
          revision: "b49240cee5116ddca73b09045fe5f70a",
        },
        {
          url: "icons/icon-384x384.png",
          revision: "e38c61a257fd5ffc1e152191c075560b",
        },
        {
          url: "icons/icon-512x512.png",
          revision: "54cc8f64af5dd74f15df959c7812703b",
        },
        {
          url: "icons/ms-icon-144x144.png",
          revision: "6c6152f4a51b19e5faa1ac3050b6b441",
        },
        {
          url: "icons/safari-pinned-tab.svg",
          revision: "0a64f3ca89d27fc7ee4754a7049a74a9",
        },
        { url: "index.html", revision: "39f73ca285917cc986f2581f2ffd15ad" },
        { url: "main-logo.png", revision: "76ddb7396377f5e1cacce065498896ac" },
        { url: "manifest.json", revision: "1c38efd4b8455d1cd192d9e5368bc6ee" },
      ],
      {}
    ),
    e.cleanupOutdatedCaches(),
    e.registerRoute(
      new e.NavigationRoute(e.createHandlerBoundToURL("index.html"), {
        denylist: [/sw\.js$/, /workbox-(.)*\\.js$/],
      })
    );
});
