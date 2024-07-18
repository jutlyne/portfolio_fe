<template>
  <div class="rendered-article prose mt-6">
    <p>Bạn có đang tìm cách deploy website Next.js hoặc một server Node.Js?</p>
    <p>
      Trong bài viết này, mình sẽ hướng dẫn các bạn deploy lên production website Next.js lên Vultr
      VPS. Với Node.Js thì tương tự 99.99% nhé (chắc khác mỗi 1 câu lệnh build code)
    </p>
    <p>
      Chúng ta sẽ tiến hành tạo một VPS mới (máy chủ riêng ảo) với hệ điều hành Ubuntu, cấu hình
      server để có thể chạy được ứng dụng Node.js, cấu hình tên miền, sử dụng Nginx web server và
      setup mã hóa HTTPS/SSL cho website của bạn để nó có đường link là
      <code>https://</code>.
    </p>
    <p>
      Trước khi bắt đầu hướng dẫn này, bạn cần có một ứng dụng Node.Js hoặc Next.Js chạy không lỗi ở
      máy tính của các bạn.
    </p>
    <blockquote>
      <p>
        Với Next.js bạn cần build code các bạn ở local để chắc chắn rằng nó không có lỗi nào, đôi
        khi bạn chạy <code>yarn dev</code> không xuất hiện lỗi nhưng <code>yarn build</code> thì lại
        có đấy!
      </p>
    </blockquote>
    <p>Một khi bạn đã chuẩn bị xong rồi thì mình sẽ bắt đầu nhé.</p>
    <p>Dưới đây là video full hướng dẫn deploy NextJs / NodeJs lên VPS 👇🏻</p>

    <hr />
    <h2 id="tao-mot-vultr-server-instance">🥇<!-- -->Tạo một Vultr Server Instance</h2>
    <p>
      Trước hết chúng ta cần tạo một instance VPS, ở đây mình dùng dịch vụ VPS của
      <a
        rel="noopener noreferrer nofollow"
        title="Vultr"
        href="https://www.vultr.com/?ref=9307237-8H"
        >Vultr</a
      >
      nhé. Đăng ký gói 5$/tháng rẻ bèo à 🤣.
    </p>
    <p>
      Để tạo được một VPS trên
      <a
        rel="noopener noreferrer nofollow"
        title="Vultr"
        href="https://www.vultr.com/?ref=9307237-8H"
        >Vultr</a
      >
      thì bạn cần 2 thứ:
    </p>
    <ul>
      <li>
        <div>
          Một tài khoản
          <a
            rel="noopener noreferrer nofollow"
            title="Vultr"
            href="https://www.vultr.com/?ref=9307237-8H"
            >Vultr</a
          >
        </div>
      </li>
      <li>
        <div>Một thẻ Visa hoặc Master Card dùng để đăng ký và thanh toán</div>
      </li>
    </ul>
    <blockquote>
      <p>
        Nếu bạn chưa có tài khoản Vultr thì có thể đăng ký qua link giới thiệu của mình, bạn sẽ nhận
        <strong>miễn phí 100$ dùng cho 60 ngày</strong>, thoải mái vọc vạch luôn:
        <a
          rel="noopener noreferrer nofollow"
          title="https://www.vultr.com/?ref=9307237-8H"
          href="https://www.vultr.com/?ref=9307237-8H"
          >https://www.vultr.com/?ref=9307237-8H</a
        >
      </p>
    </blockquote>
    <h3 id="tao-mot-instance-moi-tren-vultr">🥈<!-- -->Tạo một Instance mới trên Vultr</h3>
    <p>
      Sau khi đăng nhập thành công, Vào phần <strong>Product</strong> và click vào
      <strong>Deploy A New Server</strong>
    </p>
    <figure class="my-8">
      <a target="_blank" rel="noopener" title="Tạo mới instance vultr"
        ><img
          class="m-auto block max-h-screen max-w-full rounded-xl object-cover shadow-md"
          v-lazy="'/meo.webp'"
          alt="Tạo mới instance vultr"
          loading="lazy"
      /></a>
      <figcaption class="py-4 text-center text-[0.9em] italic">Tạo mới instance vultr</figcaption>
    </figure>
    <figure class="my-8">
      <a
        target="_blank"
        rel="noopener"
        title="Có khá nhiều loại VPS cho anh em chọn dựa vào nhu cầu, rẻ nhất thì chọn Cloud Compute (mình chọn cái này)"
        ><img
          class="m-auto block max-h-screen max-w-full rounded-xl object-cover shadow-md"
          v-lazy="'/meo.webp'"
          alt="Có khá nhiều loại VPS cho anh em chọn dựa vào nhu cầu, rẻ nhất thì chọn Cloud Compute (mình chọn cái này)"
          loading="lazy"
      /></a>
      <figcaption class="py-4 text-center text-[0.9em] italic">
        Có khá nhiều loại VPS cho anh em chọn dựa vào nhu cầu, rẻ nhất thì chọn Cloud Compute (mình
        chọn cái này)
      </figcaption>
    </figure>
    <figure class="my-8">
      <a
        target="_blank"
        rel="noopener"
        title="Chọn loại CPU và vị trí đặt Server tùy nhu cầu các bạn"
        ><img
          class="m-auto block max-h-screen max-w-full rounded-xl object-cover shadow-md"
          v-lazy="'/meo.webp'"
          alt="Chọn loại CPU và vị trí đặt Server tùy nhu cầu các bạn"
          loading="lazy"
      /></a>
      <figcaption class="py-4 text-center text-[0.9em] italic">
        Chọn loại CPU và vị trí đặt Server tùy nhu cầu các bạn
      </figcaption>
    </figure>
    <figure class="my-8">
      <a
        target="_blank"
        rel="noopener"
        title="Chọn hệ điều hành cho server. Các bạn chọn Ubuntu 22.04 LTS x64 nhé"
        ><img
          class="m-auto block max-h-screen max-w-full rounded-xl object-cover shadow-md"
          v-lazy="'/meo.webp'"
          alt="Chọn hệ điều hành cho server. Các bạn chọn Ubuntu 22.04 LTS x64 nhé"
          loading="lazy"
      /></a>
      <figcaption class="py-4 text-center text-[0.9em] italic">
        Chọn hệ điều hành cho server. Các bạn chọn Ubuntu 22.04 LTS x64 nhé
      </figcaption>
    </figure>
    <figure class="my-8">
      <a
        target="_blank"
        rel="noopener"
        title="Chọn dung lượng/tốc độ server. Mình chọn 5$/tháng cho rẻ nhất nhé."
        ><img
          class="m-auto block max-h-screen max-w-full rounded-xl object-cover shadow-md"
          v-lazy="'/meo.webp'"
          alt="Chọn dung lượng/tốc độ server. Mình chọn 5$/tháng cho rẻ nhất nhé."
          loading="lazy"
      /></a>
      <figcaption class="py-4 text-center text-[0.9em] italic">
        Chọn dung lượng/tốc độ server. Mình chọn 5$/tháng cho rẻ nhất nhé.
      </figcaption>
    </figure>
    <p>Tiếp theo là những cái dịch vụ add thêm, anh em nào muốn rẻ thì cứ chọn như mình.</p>
    <figure class="my-8">
      <a target="_blank" rel="noopener" title="Auto backup và dịch vụ thêm."
        ><img
          class="m-auto block max-h-screen max-w-full rounded-xl object-cover shadow-md"
          v-lazy="'/meo.webp'"
          alt="Auto backup và dịch vụ thêm."
          loading="lazy"
      /></a>
      <figcaption class="py-4 text-center text-[0.9em] italic">
        Auto backup và dịch vụ thêm.
      </figcaption>
    </figure>
    <p>
      Tiếp theo anh em cần thêm SSH key của anh em vào Vultr Profile. Anh em click vào
      <strong>Add New</strong> để thêm một SSH Key vào nhé
    </p>
    <figure class="my-8">
      <a target="_blank" rel="noopener" title="Click add new để thêm SSH Key vào nhé"
        ><img
          class="m-auto block max-h-screen max-w-full rounded-xl object-cover shadow-md"
          v-lazy="'/meo.webp'"
          alt="Click add new để thêm SSH Key vào nhé"
          loading="lazy"
      /></a>
      <figcaption class="py-4 text-center text-[0.9em] italic">
        Click add new để thêm SSH Key vào nhé
      </figcaption>
    </figure>
    <p>
      Nếu anh em đã có một SSH key ở máy tính rồi thì chỉ cần thêm cái public key của anh em vào đây
      là được. Sau khi thêm rồi back trở lại màn hình vừa rồi enter cái tên vps là được.
    </p>
    <p>
      Mục đích của cái SSH key này là giúp server verify rằng chỉ có máy tính cá nhân của ae mới có
      thể truy cập được vào VPS instance này.
    </p>
    <figure class="my-8">
      <a
        target="_blank"
        rel="noopener"
        title="Thêm ssh key các bạn vào đây, nhập cái name là tên ssh key các bạn. Ví dụ: Máy tính Windows 11"
        ><img
          class="m-auto block max-h-screen max-w-full rounded-xl object-cover shadow-md"
          v-lazy="'/meo.webp'"
          alt="Thêm ssh key các bạn vào đây, nhập cái name là tên ssh key các bạn. Ví dụ: Máy tính Windows 11"
          loading="lazy"
      /></a>
      <figcaption class="py-4 text-center text-[0.9em] italic">
        Thêm ssh key các bạn vào đây, nhập cái name là tên ssh key các bạn. Ví dụ: Máy tính Windows
        11
      </figcaption>
    </figure>
    <p>
      Nếu anh em chưa có SSH key ở máy tính cần tạo một SSH Key ở máy tính cá nhân, tham khảo bước
      dưới nhé.
    </p>
    <p>
      Xong rồi nhấn chọn cái SSH Key vừa thêm vào &amp; kiểm tra giá cả nhấn
      <strong>Deploy Now</strong> là được
    </p>
    <figure class="my-8">
      <a target="_blank" rel="noopener" title="Deploy vps thôi anh em"
        ><img
          class="m-auto block max-h-screen max-w-full rounded-xl object-cover shadow-md"
          v-lazy="'/meo.webp'"
          alt="Deploy vps thôi anh em"
          loading="lazy"
      /></a>
      <figcaption class="py-4 text-center text-[0.9em] italic">Deploy vps thôi anh em</figcaption>
    </figure>
    <h3 id="tao-ssh-key-o-may-tinh-ca-nhan">🥈<!-- -->Tạo SSH key ở máy tính cá nhân</h3>
    <blockquote>
      <p>
        Nếu anh em đã có một SSH Key ở máy tính rồi thì không cần tạo mới, anh em có thể bỏ qua bước
        này
      </p>
    </blockquote>
    <h4 id="tao-ssh-key">🥉<!-- -->Tạo SSH key</h4>
    <ol>
      <li><div>Đầu tiên mở terminal lên</div></li>
      <li>
        <div>
          Paste text bên dưới, thay thế email là địa chỉ email
          <code>your_email@example.com</code> là địa chỉ email của bạn (hoặc email đăng ký github
          của bạn cũng được)
        </div>
      </li>
    </ol>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">ssh-keygen -t ed25519 -C </span><span class="token string" style="color:rgb(255, 121, 198)">"your_email@example.com"</span><span class="token plain"></span></div></pre>
    </div>
    <p>
      Điều này sẽ tạo một SSH key mới, sử dụng email đã được cung cấp như một nhãn trong SSH key
      (bạn có thể mở public key của SSH key lên sẽ thấy email trong đó)
    </p>
    <p>
      Nó sẽ yêu cầu bạn nhập tên file để lưu, nếu bạn enter thì nó sẽ lấy tên file mặc định như
      trong dấu <code>()</code>.
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">Enter </span><span class="token function" style="color:rgb(80, 250, 123)">file</span><span class="token plain"> </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">in</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">which</span><span class="token plain"> to save the key </span><span class="token punctuation" style="color:rgb(248, 248, 242)">(</span><span class="token plain">/c/Users/dutha/.ssh/id_ed25519</span><span class="token punctuation" style="color:rgb(248, 248, 242)">)</span><span class="token plain">:</span></div></pre>
    </div>
    <blockquote>
      <p>
        Nếu bạn chưa quen với ssh key thì mình khuyên bạn nên enter, đừng thay đổi tên file làm gì
      </p>
    </blockquote>
    <blockquote>
      <p>
        Lưu ý là khi nhập tên file phải nhập đầy đủ đường dẫn lưu file tương tự như trong dấu
        <code>()</code> nhé.
      </p>
    </blockquote>
    <p>
      Tiếp theo nó sẽ yêu cầu bạn nhập passphrase (tương tự password thôi). Cá nhân mình thì không
      nhập, cứ Enter thôi vì khi nhập sau này mỗi khi làm việc với Git phải nhập passphrase khá mệt
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">Enter passphrase </span><span class="token punctuation" style="color:rgb(248, 248, 242)">(</span><span class="token plain">empty </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">for</span><span class="token plain"> no passphrase</span><span class="token punctuation" style="color:rgb(248, 248, 242)">)</span><span class="token plain">:</span></div></pre>
    </div>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">Enter same passphrase again:</span></div></pre>
    </div>
    <p>
      Sau khi tạo thành công thì nó sẽ sinh ra cho bạn 2 file là private key và public key theo
      đường dẫn mà bạn nhập tên file. File chứa public key sẽ có đuôi
      <code>.pub</code> phía sau.
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">Your identification has been saved </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">in</span><span class="token plain"> /c/Users/dutha/.ssh/id_duthanhduoc10</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Your public key has been saved </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">in</span><span class="token plain"> /c/Users/dutha/.ssh/id_duthanhduoc10.pub</span></div></pre>
    </div>
    <p>
      Để đọc nội dung public SSH key thì bạn chỉ có khá nhiều cách, bạn dùng cách nào dưới đây cũng
      được. Ví dụ file public key của mình bên trên là
      <code>id_duthanhduoc10.pub</code>
    </p>
    <ul>
      <li>
        <div>
          Copy đường dẫn này
          <code>c:/Users/dutha/.ssh/id_duthanhduoc10.pub</code> bỏ lên Chrome thì nó sẽ ra nội dung
          của public key
        </div>
      </li>
      <li>
        <div>
          Dùng git bash gõ
          <code>cat /c/Users/dutha/.ssh/id_duthanhduoc10.pub</code> nó sẽ ra public key
        </div>
      </li>
      <li>
        <div>
          Hoặc tìm đến cái file đó trong thư mục và mở nó lên bằng Notepad, các bạn sẽ có được
          public key
        </div>
      </li>
    </ul>
    <p>
      Sau khi có public key rồi thì chỉ cần quay trở lại trang web đang làm dỡ lúc nãy, click vào
      <strong>Add New</strong> để thêm SSH Key vào.
    </p>
    <h4 id="tao-file-config-chi-lam-khi-ban-dat-ten-file-ssh-khac-ten-file-mac-dinh">
      🥉<!-- -->Tạo file <code>config</code> (chỉ làm khi bạn đặt tên file ssh khác tên file mặc
      định)
    </h4>
    <p>
      Trong trường hợp bạn thay đổi tên file thì bạn phải tạo một file
      <code>config</code> trong thư mục <code>.ssh</code> với nội dung như dưới đây thì github mới
      hiểu được.
    </p>
    <p>cd vào thư mục <code>.ssh</code></p>
    <p>
      Tạo 1 file <code>config</code> trong thư mục <code>.ssh</code> của user <code>duoc</code>. Anh
      em thay thế chữ <code>duoc</code> thành username anh em nhé.
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">touch</span><span class="token plain"> /c/Users/dutha/.ssh/config</span></div></pre>
    </div>
    <p>Edit file <code>config</code> vừa tạo</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">nano</span><span class="token plain"> /c/Users/dutha/.ssh/config</span></div></pre>
    </div>
    <p>
      Copy đoạn code phía dưới vào, sửa
      <code>ten_file_private_key_ssh</code> thành tên file chứa private key ssh của bạn
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token comment" style="color:rgb(98, 114, 164)">#Default GitHub</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Host github.com</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">HostName github.com</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">User </span><span class="token function" style="color:rgb(80, 250, 123)">git</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">IdentityFile ~/.ssh/ten_file_private_key_ssh</span></div></pre>
    </div>
    <p>
      Để lưu thì nhấn <code>Ctrl X</code> -&gt; <code>Y</code> -&gt;
      <code>Enter</code>
    </p>
    <p>Thế là xong!</p>
    <hr />
    <h2 id="cau-hinh-vps-server-cua-ban">🥇<!-- -->Cấu hình vps server của bạn</h2>
    <p>Bây giờ bạn đã có một server mới toanh dựa trên những gì bạn đã lựa chọn.</p>
    <p>Trong phần này, chúng ta sẽ truy cập server thông qua OpenSSH Client.</p>
    <p>
      Tất nhiên anh em cũng có thể dùng Putty, tham khảo bài này để biết cách
      <a
        rel="noopener noreferrer nofollow"
        title="Kết nối đến một server sử dụng SSH key"
        href="https://www.vultr.com/docs/connect-to-a-server-using-an-ssh-key"
        >Kết nối đến một server sử dụng SSH key</a
      >
    </p>
    <h3 id="truy-cap-den-server-su-dung-root">🥈<!-- -->Truy cập đến server sử dụng root</h3>
    <p>
      Sau khi tạo xong một instance VPS thì anh em sẽ có các thông tin như Username (root) và địa
      chỉ IP cũng như Password
    </p>
    <figure class="my-8">
      <a target="_blank" rel="noopener" title="Thông tin instance sau khi tạo"
        ><img
          class="m-auto block max-h-screen max-w-full rounded-xl object-cover shadow-md"
          v-lazy="'/meo.webp'"
          alt="Thông tin instance sau khi tạo"
          loading="lazy"
      /></a>
      <figcaption class="py-4 text-center text-[0.9em] italic">
        Thông tin instance sau khi tạo
      </figcaption>
    </figure>
    <p>Bây giờ để truy cập đến server thì anh em cần chuẩn bị cho mình 3 thứ</p>
    <ul>
      <li>
        <div>
          Một terminal đã enable giao thức SSH. Gõ <code>ssh -V</code> nếu ra ra thông tin version
          thì có nghĩa là cài rồi. Nếu anh em Windows chưa cài thì cài Git SCM thì tự nó có.
        </div>
      </li>
      <li><div>Password của server</div></li>
      <li><div>IP server</div></li>
    </ul>
    <p>
      OK, Bây giờ anh em mở terminal lên gõ câu lệnh bên dưới, thay thế
      <code>ip_address</code> là địa chỉ IP server của anh em.
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">ssh</span><span class="token plain"> root@ip_address</span></div></pre>
    </div>
    <p>Nếu xuất hiện warning hay cảnh báo gì, cứ chấp thuận nó.</p>
    <p>
      Nếu anh em dùng tên file mặc định lúc tạo ssh key ở máy cá nhân thì tự động nó sẽ vào luôn mà
      không cần nhập password. Nếu tạo một cái tên file khác thì dùng câu lệnh dưới đây, truyền cái
      đường dẫn đến file private key của anh em vào. Như thế này thì anh em sẽ không cần nhập
      password của
      <code>root</code> user nữa.
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">ssh</span><span class="token plain"> -i /path/to/your/id_rsa root@ip_address</span></div></pre>
    </div>
    <p>Sau khi login thành công thì bây giờ anh em đã ở trong server Vultr rồi.</p>
    <p>
      Root user trong môi trường Linux có quyền hạn rất rộng, vì nên bạn không nên dùng nó thường
      xuyên. Nhỡ đâu anh em thay đổi gì đó vô tình làm hại hệ điều hành là toang.
    </p>
    <p>
      Do đó, ở bước tiếp theo chúng ta sẽ tạo một tài khoản thay thế để giới hạn quyền hành cho các
      tác vụ hằng ngày.
    </p>
    <blockquote>
      <p>
        Nếu anh em gặp lỗi
        <strong>WARNING: REMOTE HOST IDENTIFICATION HAS CHANGED!</strong> thì chỉ cần chạy câu lệnh
        <code>ssh-keygen -R "ip_address"</code> là được. Câu lệnh này sẽ xóa tất cả các key thuộc về
        <code>ip_address</code> trong file
        <code>./ssh/known_hosts</code>
      </p>
    </blockquote>
    <h3 id="tao-mot-user-moi-tren-linux">🥈<!-- -->Tạo một user mới trên linux</h3>
    <p>
      Sau khi đã login như một root user rồi, bây giờ các bạn gõ câu lệnh bên dưới (thay thế
      <code>duoc</code> là username của các bạn)
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">adduser duoc</span></div></pre>
    </div>
    <p>Nó sẽ yêu cầu tạo password cho username này, anh em nhập vào và ghi nhớ nhé.</p>
    <p>Một số câu hỏi tùy chọn còn lại anh em chỉ cần nhấn <code>Enter</code> để skip qua.</p>
    <p>
      Bây giờ anh em đã có một tài khoản user mới với các quyền hạn thông thường. Nhưng đôi khi thì
      anh em sẽ bị yêu cầu quyền root khi thực hiện các tác vụ đặc biệt. Lúc này anh em chỉ cần thêm
      câu lệnh <code>sudo</code> trước mỗi dòng lệnh là được.
    </p>
    <p>
      Để làm được điều này, chúng ta cần thêm người dùng mới tạo vào nhóm
      <code>sudo</code> trên vps
    </p>
    <p>
      Tại root user, chạy câu lệnh bên dưới để add user của bạn vào
      <code>sudo</code> group (thay thế <code>duoc</code> với username của các bạn)
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">usermod</span><span class="token plain"> -aG </span><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> duoc</span></div></pre>
    </div>
    <p>Bây giờ thì user của bạn có thể chạy các câu lệnh với quyền hạn root!</p>
    <p>Các bạn có thể login VPS bằng username và password vừa tạo thay vì root user.</p>
    <p>
      Hoặc cũng có thể chuyển qua lại giữa các user bằng câu lệnh dưới đây (thay thế
      <code>duoc</code> là username của các bạn), nếu nó yêu cầu nhập password thì các bạn enter
      password của user đích đến.
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">su</span><span class="token plain"> - duoc</span></div></pre>
    </div>
    <h3 id="them-ssh-key-o-may-ca-nhan-vao-user-moi-tao-tren-vps">
      🥈<!-- -->Thêm ssh key ở máy cá nhân vào user mới tạo trên VPS
    </h3>
    <p>
      Hiện tại thì chúng ta truy cập vào VPS với user <code>root</code> thì không cần nhập mật khẩu,
      nhưng với user mới tạo thì cần phải nhập. Điều này không cần thiết và cũng không an toàn.
      Chúng ta có thể truy cập không cần nhập mật khẩu tương tự với <code>root</code>.
    </p>
    <p>
      Vậy nên chúng ta cần thêm ssh key vào user mới tạo, còn user
      <code>root</code> thì nó đã tự động được thêm lúc deploy VPS rồi.
    </p>
    <p>
      🚀Cách 1 thì chúng ta công cụ <code>ssh-copy-id</code> (cái <code>ssh-copy-id</code> này đã
      cài sẵn trên git bash, các máy linux, mac workstation thì có thể cài theo
      <a
        rel="noopener noreferrer nofollow"
        title="hướng dẫn này"
        href="https://www.ssh.com/ssh/copy-id#ssh-copy-id-on-mac"
        >hướng dẫn này</a
      >)
    </p>
    <p>
      Thay thế <code>~/.ssh/id_rsa.pub</code> thành đường dẫn public key anh em,
      <code>root@192.0.2.123</code> thành username và ip address tương ứng.
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">ssh-copy-id -i ~/.ssh/id_rsa.pub root@192.0.2.123</span></div></pre>
    </div>
    <p>🚀Cách 2 thì chúng ta làm thủ công</p>
    <ol>
      <li><div>SSH đến server với username vừa tạo</div></li>
      <li>
        <div>
          Tạo thư mục <code>.ssh</code> trong thư mục home của user vừa tạo:
          <code>mkdir ~/.ssh</code>
        </div>
      </li>
      <li>
        <div>
          Tạo file <code>authorized_keys</code> trong thư mục <code>.ssh</code>:
          <code>sudo touch ~/.ssh/authorized_keys</code>
        </div>
      </li>
      <li>
        <div>
          Edit file <code>~/.ssh/authorized_keys</code> với cú pháp:
          <code>sudo nano ~/.ssh/authorized_keys</code>
        </div>
      </li>
      <li><div>Copy public key của anh em vào đây</div></li>
      <li>
        <div>
          Lưu và thoát bằng cú pháp <code>Ctrl X</code> -&gt; <code>Y</code> -&gt;
          <code>Enter</code>
        </div>
      </li>
    </ol>
    <h3 id="cai-dat-nodejs-len-vps-ubuntu">🥈<!-- -->Cài đặt Node.Js lên VPS Ubuntu</h3>
    <p>Login hoặc chuyển sang user mới tạo nhé</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">su</span><span class="token plain"> - duoc</span></div></pre>
    </div>
    <p>Cập nhật các package mới</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">apt-get</span><span class="token plain"> update</span></div></pre>
    </div>
    <p>Cập nhật các package đã cài trong máy</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">apt-get</span><span class="token plain"> upgrade</span></div></pre>
    </div>
    <p>
      Cài đặt NVM để quản lý Node.Js version cho dễ. Bên dưới là câu lệnh cài NVM theo version hiện
      tại mình viết bài này, nếu anh em muốn cài theo version mới nhất thì
      <a
        rel="noopener noreferrer nofollow"
        title="click vào link này để lấy câu lệnh"
        href="https://github.com/nvm-sh/nvm#install--update-script"
        >click vào link này để lấy câu lệnh</a
      >
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">curl</span><span class="token plain"> -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh </span><span class="token operator">|</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">bash</span><span class="token plain"></span></div></pre>
    </div>
    <p>
      Sau khi cài NVM xong nhưng anh em vẫn chưa dùng được đâu, anh em tắt terminal đi và login vào
      lại <strong>user mới tạo</strong> nhé.
    </p>
    <p>Bây giờ thì anh em mới có thể dùng NVM được.</p>
    <p>Tiếp theo anh em sẽ cài Node.Js</p>
    <p>
      Tùy theo version Node.Js anh em chạy ở local, anh em nên cài đúng version để tránh trường hợp
      local chạy được nhưng deploy thì lại hẻo.
    </p>
    <p>Nếu muốn cài phiên bản 21 thì</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">nvm </span><span class="token function" style="color:rgb(80, 250, 123)">install</span><span class="token plain"> </span><span class="token number">21</span><span class="token plain"></span></div></pre>
    </div>
    <p>Còn nếu muốn cài phiên bản mới nhất thì</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">nvm </span><span class="token function" style="color:rgb(80, 250, 123)">install</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">node</span><span class="token plain"></span></div></pre>
    </div>
    <p>Sau khi cài Node.js xong thì để kiểm tra Node.Js version mấy chỉ cần</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">node</span><span class="token plain"> -v</span></div></pre>
    </div>
    <h3 id="cau-hinh-git-tren-vps">🥈<!-- -->Cấu hình Git trên VPS</h3>
    <p>
      Để có thể kéo code về server thì anh em cần cấu hình git trên server, mỗi khi có cập nhật mới
      ở code thì chỉ cần truy cập vào server kéo code về, chạy lại các câu lệnh deploy là được.
    </p>
    <blockquote>
      <p>
        Đây là bước cơ bản, sau này anh em sẽ có thể thiết kế các hệ thống CI CD tự động deploy.
        Chuyện đó để những bài khác nhé.
      </p>
    </blockquote>
    <p>
      Bây giờ anh em thực hiện lại y hệt cái bước tạo SSH Keys ở máy tính cá nhân, chỉ khác là anh
      em tạo ở VPS.
    </p>
    <p>
      Để ý cái vụ tên file nhé, anh em nào không rõ thì cứ để mặc định đi, vì sửa tên tầm bậy là
      phải tạo file <code>config</code> như bên trên đó.
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">ssh-keygen -t ed25519 -C </span><span class="token string" style="color:rgb(255, 121, 198)">"your_email@example.com"</span><span class="token plain"></span></div></pre>
    </div>
    <p>
      Tiếp theo cứ nhấn Enter Enter và cuối cùng là copy public key, (anh em thay cái
      <code>duoc</code> thành username và <code>ten_ssh_file.pub</code> thành tên file public key
      ssh của anh em)
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">cat</span><span class="token plain"> /home/duoc/.ssh/ten_ssh_file.pub</span></div></pre>
    </div>
    <p>Lấy được public key, anh em thêm public key vào phần Add SSH Key Github của anh em.</p>
    <p>Sau khi add xong rồi thì anh em chỉ cần clone repo của anh em về VPS</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">git</span><span class="token plain"> clone git@github.com:usernameGithub/tenRepo.git</span></div></pre>
    </div>
    <p>
      Sở dĩ chúng ta có thể dùng được câu lệnh git vì git được cài đặt sẵn trong VPS Ubuntu rồi.
    </p>
    <h3 id="deploy-du-an-nextjs-hoac-nodejs-tren-server-vps">
      🥈<!-- -->Deploy dự án Next.Js (hoặc Node.Js) trên Server VPS
    </h3>
    <p>Đầu tiên cần cd vào đúng đường dẫn vừa clone về</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token builtin class-name" style="color:rgb(189, 147, 249)">cd</span><span class="token plain"> tenRepo</span></div></pre>
    </div>
    <p>Cài <strong>yarn</strong> và <strong>pm2</strong> global</p>
    <blockquote>
      <p>Nếu dự án anh em không dùng yarn thì không cần cài cũng được</p>
    </blockquote>
    <blockquote>
      <p>
        PM2 là một thư viện giúp quản lý tiến trình cho các ứng dụng Node.Js. Nó giúp ứng dụng
        Node.Js của anh em hoạt động mãi mãi, cho dù có reboot lại VPS thì nó sẽ mở lên lại ngay.
      </p>
    </blockquote>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">npm</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">install</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">yarn</span><span class="token plain"> -g</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token function" style="color:rgb(80, 250, 123)">npm</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">install</span><span class="token plain"> pm2 -g</span></div></pre>
    </div>
    <p>Tiến hành cài đặt các package dự án</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">yarn</span><span class="token plain"></span></div></pre>
    </div>
    <p>
      Nếu ứng dụng Next.Js thì anh em cần build, còn Node.Js thì tùy code anh em có cần build hay
      không nhé
    </p>
    <p>Với Next.Js thì ta cần build dự án</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">yarn</span><span class="token plain"> build</span></div></pre>
    </div>
    <p>Tiếp theo chạy dự án Next.Js hoặc Node.Js lên coi thử có lỗi gì không</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">yarn</span><span class="token plain"> start</span></div></pre>
    </div>
    <p>
      Lúc này nếu không lỗi thì anh em có thể truy cập đến website (hoặc API) của anh em qua địa chỉ
      IP và port rồi
    </p>
    <p>
      Ví dụ IP của VPS mình là 45.12.123.123 và port Next.js mình là 3000 thì mình chỉ cần mở trình
      duyệt lên nhập URL <code>45.12.123.123:3000</code> vào là thấy
    </p>
    <p>Chạy ổn rồi thì anh em tắt App đi nhé, nhấn <code>Ctrl + C</code> để tắt tiến trình</p>
    <p>
      Bây giờ chúng ta sẽ tiến hành chạy Next.js với PM2, anh em phải chắc chắn rằng đã ở trong
      đường dẫn của app rồi nhé
    </p>
    <p>Chạy câu lệnh bên dưới</p>
    <ul>
      <li>
        <div>Thay thế <code>website</code> thành tên website của anh em</div>
      </li>
      <li>
        <div>
          Vì câu lệnh run app mình là <code>yarn start</code> nên mình để là
          <code>yarn -- start</code>, ví dụ nếu anh em dùng <code>npm deploy</code> thì sửa lại là
          <code>npm -- deploy</code>
        </div>
      </li>
    </ul>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">pm2 start --name</span><span class="token operator">=</span><span class="token plain">website </span><span class="token function" style="color:rgb(80, 250, 123)">yarn</span><span class="token plain"> -- start</span></div></pre>
    </div>
    <p>
      Câu lệnh này sẽ khởi chạy ứng dụng Next.Js của anh em, sau đó hiển thị một cái bảng với name,
      process ID, status, CPU sử dụng,...
    </p>
    <p>Muốn xem các tiến trình đang chạy bởi pm2 thì dùng</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">pm2 </span><span class="token function" style="color:rgb(80, 250, 123)">ls</span><span class="token plain"></span></div></pre>
    </div>
    <p>
      Mỗi khi reboot VPS thì chúng ta muốn pm2 khởi chạy lại các tiến trình trước đó, để làm được
      điều này
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">pm2 save</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">pm2 startup</span></div></pre>
    </div>
    <p>Nó sẽ in ra kết quả tương tự như dưới đây</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token punctuation" style="color:rgb(248, 248, 242)">[</span><span class="token plain">PM2</span><span class="token punctuation" style="color:rgb(248, 248, 242)">]</span><span class="token plain"> Init System found: systemd</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token punctuation" style="color:rgb(248, 248, 242)">[</span><span class="token plain">PM2</span><span class="token punctuation" style="color:rgb(248, 248, 242)">]</span><span class="token plain"> You have to run this </span><span class="token builtin class-name" style="color:rgb(189, 147, 249)">command</span><span class="token plain"> as root. Execute the following command:</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">env</span><span class="token plain"> </span><span class="token assign-left variable environment constant" style="color:rgb(189, 147, 249);font-style:italic">PATH</span><span class="token operator">=</span><span class="token environment constant" style="color:rgb(189, 147, 249)">$PATH</span><span class="token plain">:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u duoc --hp /home/duoc</span></div></pre>
    </div>
    <p>
      Anh em cần copy cái dòng cuối cùng và chạy, như vậy thì PM2 luôn luôn start mỗi khi server
      khởi động
    </p>
    <p>Câu lệnh của bạn thì tương tự dưới đây</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">env</span><span class="token plain"> </span><span class="token assign-left variable environment constant" style="color:rgb(189, 147, 249);font-style:italic">PATH</span><span class="token operator">=</span><span class="token environment constant" style="color:rgb(189, 147, 249)">$PATH</span><span class="token plain">:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u duoc --hp /home/duoc</span></div></pre>
    </div>
    <p>
      Cái này sẽ tạo một đơn vị <code>systemd</code> giúp PM2 chạy trên user của bạn mỗi khi khởi
      động. Để kiểm tra trạng thái của đơn vị <code>systemd</code> mới tạo, sử dụng câu lệnh dưới.
    </p>
    <p>Thay thế <code>duoc</code> thành username của anh em.</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">systemctl status pm2-duoc</span></div></pre>
    </div>
    <p>
      Có thể nó sẽ in ra <code>inactive</code>, nhưng an tâm. Bây giờ hãy tiến hành reboot lại VPS
      và gõ lại <code>systemctl status pm2-duoc</code> để check xem nó có ra
      <code>active</code> không nhé.
    </p>
    <p>
      Bây giờ thì web app Next.Js của anh em đã chạy trên port
      <code>3000</code> mãi mãi (nếu anh em để mặc định), cho đến khi nói PM2 ngừng
    </p>
    <blockquote>
      <p>Để xem các tiến trình đang chạy trên PM2 thì gõ <code>pm2 ls</code></p>
    </blockquote>
    <p>
      Trong tương lai, nếu có update code. Tất cả những gì anh em cần làm là thực hiện theo các bước
      dưới đây
    </p>
    <ol>
      <li><div>Push thay đổi code lên Github/Gitlab</div></li>
      <li>
        <div>SSH vào Vultr Server thông qua terminal với username đã tạo</div>
      </li>
      <li><div>cd vào folder dự án trên vps</div></li>
      <li>
        <div>pull code về bằng câu lệnh <code>git pull</code></div>
      </li>
      <li>
        <div>Cài đặt lại các package <code>yarn</code></div>
      </li>
      <li>
        <div>Build Next.Js với <code>yarn build</code></div>
      </li>
      <li>
        <div>
          Restart lại tiến trình PM2 với <code>pm2 restart website</code> (thay
          <code>website</code> thành tên website mà anh em đã tạo ở trên kia)
        </div>
      </li>
    </ol>
    <p>🔥 Câu lệnh redeploy rút gọn của mình khi login vào vps đúng với username là</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token builtin class-name" style="color:rgb(189, 147, 249)">cd</span><span class="token plain"> Portfolio </span><span class="token operator">&amp;&amp;</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">git</span><span class="token plain"> pull </span><span class="token operator">&amp;&amp;</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">yarn</span><span class="token plain"> build </span><span class="token operator">&amp;&amp;</span><span class="token plain"> pm2 restart portfolio</span></div></pre>
    </div>
    <p>
      Chỉ cần chạy 1 câu lệnh đó thôi là nó tự làm hết mọi thứ luôn, hoặc anh em có thể setup Github
      Action để nó tự deploy.
    </p>
    <hr />
    <h2 id="tro-ten-mien-domain-ve-vps">🥇<!-- -->Trỏ tên miền (domain) về VPS</h2>
    <p>
      Thường thì khi mua một tên miền thì nhà cung cấp tên miền đó sẽ cho anh em 2 thứ để setting
    </p>
    <ul>
      <li><div>DNS</div></li>
      <li><div>Record (bản ghi)</div></li>
    </ul>
    <p>Và khi dùng 1 VPS thì cái instance đó cũng cho anh em 1 khu vực để setting DNS</p>
    <p>
      Cái tên miền của anh em sẽ dựa vào cái DNS này để phân giải tên miền, anh em có thể chọn dùng
      của nhà cung cấp tên miền hoặc bên VPS
    </p>
    <p>Cá nhân mình thì mình dùng bên nhà cung cấp tên miền nhé</p>
    <h3 id="tro-ten-mien-chinh-ve-vps">🥈<!-- -->Trỏ tên miền chính về VPS</h3>
    <p>
      Bây giờ thì anh em chỉ cần vào phần chỉnh sửa bản ghi bên nhà cung cấp tên miền thêm 2 record
      sau
    </p>
    <p>Tương ứng là Tên record (Host) - Type - Value - TTL</p>
    <p>
      Nhớ sửa <code>ip_vps_address</code> thành địa chỉ IP VPS của anh em,
      <code>example.com</code> thành tên miền anh em.
    </p>
    <ul>
      <li><div>@ - A - ip_vps_address - 300</div></li>
      <li><div>www - CNAME - example.com - 300</div></li>
    </ul>
    <blockquote>
      <p>
        Vì có A record nên sau khi tạo, đợi 1 phút sau hãy truy cập để tránh bị dính cache DNS. Nếu
        mà dính cache DNS thì anh em sẽ mất 24-48h mới có thể truy cập vào được 🥲
      </p>
    </blockquote>
    <h3 id="tro-ten-mien-con-ve-vps">🥈<!-- -->Trỏ tên miền con về VPS</h3>
    <p>
      Trong trường hợp anh em dùng tên miền con (sub domain) dạng
      <code>sub.example.com</code> thì tạo 2 record type <code>A</code> như sau
    </p>
    <ul>
      <li><div>sub.example.com - A - ip_vps_address - 300</div></li>
      <li><div>www.sub.example.com - A - ip_vps_address - 300</div></li>
    </ul>
    <p>
      Những setting Nginx và Cerbot ở phía dưới anh em đổi lại thành tên miền con tương ứng nhé.
    </p>
    <hr />
    <h2 id="cai-va-cau-hinh-nginx">🥇<!-- -->Cài và cấu hình Nginx</h2>
    <h3 id="cai-dat-nginx">🥈<!-- -->Cài đặt Nginx</h3>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">apt-get</span><span class="token plain"> update </span><span class="token operator">&amp;&amp;</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">apt-get</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">install</span><span class="token plain"> nginx</span></div></pre>
    </div>
    <h3 id="cau-hinh-tuong-lua-firewall">🥈<!-- -->Cấu hình tường lửa (firewall)</h3>
    <p>
      Nginx đăng ký trong ubuntu như một dịch vụ <code>ufw</code> (tường lửa đơn giản). Chúng ta cần
      cấu hình lại một tí để truy cập đến Nginx dễ dàng hơn.
    </p>
    <p>Để liệt kê các cấu hình app mà <code>ufw</code> biết thì chỉ cần gõ</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> ufw app list</span></div></pre>
    </div>
    <p>Các bạn sẽ nhận được danh sách profile dưới đây</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">Available applications:</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">  Nginx Full</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">  Nginx HTTP</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">  Nginx HTTPS</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">  OpenSSH</span></div></pre>
    </div>
    <p>Có 3 loại profile có sẵn cho Nginx</p>
    <ol>
      <li>
        <div>
          <strong>Nginx Full</strong>: mở port <code>80</code> (phổ biến, traffic web không được mã
          hóa) và port <code>443</code> (mã hóa traffic TLS/SSL)
        </div>
      </li>
      <li>
        <div>
          <strong>Nginx HTTP</strong>: Chỉ mở port <code>80</code> (phổ biến, traffic web không được
          mã hóa)
        </div>
      </li>
      <li>
        <div>
          <strong>Nginx HTTPS</strong>: Chỉ mở port <code>443</code> (mã hóa traffic TLS/SSL)
        </div>
      </li>
    </ol>
    <p>
      Tất nhiên bây giờ ai mà dùng giao thức <code>http</code> nữa, chuyển sang
      <code>https</code> hết rồi. Vậy nên anh em mở full hết cho mình.
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> ufw allow </span><span class="token string" style="color:rgb(255, 121, 198)">'Nginx Full'</span><span class="token plain"></span></div></pre>
    </div>
    <p>Để kiểm tra thay đổi thì gõ</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> ufw status</span></div></pre>
    </div>
    <p>Anh em sẽ thấy <code>Nginx Full</code> được list ra ở output</p>
    <p>
      Nếu nó ra <code>inactive</code> nghĩa là tường lửa đã bị tắt, chúng ta nên bật tường lửa lên
      và chỉ nên mở một số port mà chúng ta dùng thôi nhé.
    </p>
    <p>
      Trong bài viết này là mình sẽ mở <code>Nginx Full</code> và <code>ssh</code>, vì nếu không mở
      <code>ssh</code> thì anh em không ssh vào server được.
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token comment" style="color:rgb(98, 114, 164)"># Mở port 22 (ssh), Nginx Full mở rồi không cần mở lại</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> ufw allow </span><span class="token function" style="color:rgb(80, 250, 123)">ssh</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token comment" style="color:rgb(98, 114, 164)"># Bật tường lửa, nhưng cái này chỉ bật trong phiên làm việc hiện tại thôi, reboot là nó tự tắt</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> ufw </span><span class="token builtin class-name" style="color:rgb(189, 147, 249)">enable</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token comment" style="color:rgb(98, 114, 164)"># Kiểm tra trạng thái tường lửa</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> ufw status</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token comment" style="color:rgb(98, 114, 164)"># Yêu cầu tường lửa lên mỗi khi khởi động lại server</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> systemctl </span><span class="token builtin class-name" style="color:rgb(189, 147, 249)">enable</span><span class="token plain"> ufw</span></div></pre>
    </div>
    <p>
      Trong trường hợp anh em lỡ chọn <strong>Nginx HTTP</strong> mà giờ muốn xóa thì chỉ cần chạy
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> ufw delete allow </span><span class="token string" style="color:rgb(255, 121, 198)">'Nginx HTTP'</span><span class="token plain"></span></div></pre>
    </div>
    <h3 id="test-nginx-web-server">🥈<!-- -->Test Nginx Web Server</h3>
    <p>Để chắc chắn rằng service Nginx đang được chạy, chỉ cần chạy câu lệnh</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">systemctl status nginx</span></div></pre>
    </div>
    <p>
      Nó sẽ ra output kiểu như thế này, nếu anh em thấy chữ
      <code>active (running)</code> nghĩa là thành công rồi đó
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">● nginx.service - A high performance web server and a reverse proxy server</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">    Loaded: loaded </span><span class="token punctuation" style="color:rgb(248, 248, 242)">(</span><span class="token plain">/lib/systemd/system/nginx.service</span><span class="token punctuation" style="color:rgb(248, 248, 242)">;</span><span class="token plain"> enabled</span><span class="token punctuation" style="color:rgb(248, 248, 242)">;</span><span class="token plain"> vendor preset: enabled</span><span class="token punctuation" style="color:rgb(248, 248, 242)">)</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">    Active: active </span><span class="token punctuation" style="color:rgb(248, 248, 242)">(</span><span class="token plain">running</span><span class="token punctuation" style="color:rgb(248, 248, 242)">)</span><span class="token plain"> since Mon </span><span class="token number">2016</span><span class="token plain">-04-18 </span><span class="token number">16</span><span class="token plain">:14:00 EDT</span><span class="token punctuation" style="color:rgb(248, 248, 242)">;</span><span class="token plain"> 4min 2s ago</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">  Main PID: </span><span class="token number">12857</span><span class="token plain"> </span><span class="token punctuation" style="color:rgb(248, 248, 242)">(</span><span class="token plain">nginx</span><span class="token punctuation" style="color:rgb(248, 248, 242)">)</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">    CGroup: /system.slice/nginx.service</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">      ├─12857 nginx: master process /usr/sbin/nginx -g daemon on</span><span class="token punctuation" style="color:rgb(248, 248, 242)">;</span><span class="token plain"> master_process on</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">      └─12858 nginx: worker process</span></div></pre>
    </div>
    <p>
      Bây giờ anh em gõ địa chỉ IP server lên url trình duyệt (<code>http://ip_address</code>), nó
      sẽ ra cái trang chào mừng của Nginx dạng
      <strong>Welcome to nginx!</strong>
    </p>
    <h3 id="cau-hinh-nginx-lam-reverse-proxy">🥈<!-- -->Cấu hình Nginx làm Reverse Proxy</h3>
    <p>
      Bây giờ thì ứng dụng web của chúng ta đang chạy và lắng nghe trên
      <code>localhost:3000</code>, nhưng không thể để người dùng truy cập thông qua cái port
      <code>3000</code> hay qua địa chỉ IP của VPS được.
    </p>
    <p>
      Vậy nên chúng ta cần sử dụng Nginx để làm cho mọi người truy cập web app chúng ta thông qua
      một domain.
    </p>
    <p>Để làm được điều này thì chúng ta cần sử dụng Nginx như một reverse proxy</p>
    <p>
      Trên các hệ thống Debian (ví dụ như Ubuntu), các file cấu hình Nginx server được lưu trữ trong
      thư mục <code>/etc/nginx/sites-available</code> và được kích hoạt thông qua thư mục
      <code>/etc/nginx/sites-enabled</code>
    </p>
    <p>
      Vậy nên chúng ta cần tạo một file cấu hình trong thư mục
      <code>/etc/nginx/sites-available</code>
    </p>
    <p>Đầu tiên cần di chuyển vào thư mục <code>/etc/nginx/sites-available</code></p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token builtin class-name" style="color:rgb(189, 147, 249)">cd</span><span class="token plain"> /etc/nginx/sites-available</span></div></pre>
    </div>
    <p>
      Sau đó, tạo một file cấu hình trong này (cần dùng <code>sudo</code> để thực hiện những thay
      đổi trong đây)
    </p>
    <p>
      Với <code>example.com</code> là tên file, thường thì mình sẽ để tên file là domain của mình để
      dễ quản lý.
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">touch</span><span class="token plain"> example.com</span></div></pre>
    </div>
    <p>Mở file và edit bằng <code>nano</code></p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">nano</span><span class="token plain"> example.com</span></div></pre>
    </div>
    <p>Thêm đoạn code phía dưới vào, anh em paste vào rồi sửa cho nhanh.</p>
    <ul>
      <li>
        <div>
          <p>Sửa <code>example.com</code> thành domain của anh em nhé</p>
        </div>
      </li>
      <li>
        <div>
          <p>Sửa <code>http://localhost:3000</code> thành đúng port của anh em nhé</p>
        </div>
      </li>
    </ul>
    <div class="codeBlock">
      <div class="languageCode">nginx</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-nginx customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">server {</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">        listen 80;</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">        listen [::]:80;</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain" style="display:inline-block">
</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">        root /var/www/html;</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">        index index.html index.htm index.nginx-debian.html;</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain" style="display:inline-block">
</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">        server_name example.com www.example.com;</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain" style="display:inline-block">
</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">        location / {</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">                proxy_pass http://localhost:3000;</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">                proxy_http_version 1.1;</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">                proxy_set_header Upgrade $http_upgrade;</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">                proxy_set_header Connection 'upgrade';</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">                proxy_set_header Host $host;</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">                proxy_cache_bypass $http_upgrade;</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">        }</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">}</span></div></pre>
    </div>
    <p>
      Lưu và thoát bằng cách nhấn tổ hợp <code>Ctrl X</code> -&gt; <code>Y</code> -&gt;
      <code>Enter</code>
    </p>
    <p>
      Bây giờ chúng ta cần kích hoạt cái file vừa tạo thông qua thư mục
      <code>/sites-enabled</code>, chỉ cần chạy câu lệnh dưới đây
    </p>
    <p>Hãy chắc chắn rằng đã thay <code>example.com</code> bằng tên file mà anh em vừa tạo</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">ln</span><span class="token plain"> -s /etc/nginx/sites-available/example.com /etc/nginx/sites-enabled/</span></div></pre>
    </div>
    <p>
      File cấu hình của anh em đã được liên kết đến thư mục
      <code>/sites-enabled</code>
    </p>
    <p>
      Để tránh vấn đề <strong>hash bucket memory</strong> trong tương lai khi chúng ta thêm app,
      chúng ta cần tinh chỉnh một dòng trong file
      <code>/etc/nginx/nginx.conf</code>
    </p>
    <p>Mở nó lên bằng nano</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">nano</span><span class="token plain"> /etc/nginx/nginx.conf</span></div></pre>
    </div>
    <p>
      Trong file đó, tìm cái dòng comment là
      <code># server_names_hash_bucket_size 64;</code> và xóa cái ký tự <code>#</code> để mở comment
      cho nó.
    </p>
    <p>Cuối cùng ta có như thế này</p>
    <div class="codeBlock">
      <div class="languageCode">nginx</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-nginx customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">http {</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">    . . .</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain" style="display:inline-block">
</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">    server_names_hash_bucket_size 64;</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain" style="display:inline-block">
</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">    . . .</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">}</span></div></pre>
    </div>
    <p>Lưu và đóng file.</p>
    <p>
      Tiếp theo chúng ta sử dụng câu lệnh <code>nginx -t</code> để kiểm tra lỗi cú pháp trong những
      file cấu hình đã được tạo hoặc edit:
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> nginx -t</span></div></pre>
    </div>
    <p>Nếu không có vấn đề gì, restart Nginx để enable những thay đổi vừa rồi.</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> systemctl restart nginx</span></div></pre>
    </div>
    <hr />
    <h2 id="cau-hinh-ma-hoa-httpsssl">🥇<!-- -->Cấu hình mã hóa HTTPS/SSL</h2>
    <p>
      Tiếp theo chúng ta sẽ sử dụng dịch vụ
      <a rel="noopener noreferrer nofollow" title="Let's Encrypt" href="https://letsencrypt.org/"
        >Let's Encrypt</a
      >
      và phần mềm
      <a rel="noopener noreferrer nofollow" title="Certbot" href="https://certbot.eff.org/"
        >Certbot</a
      >
      để lấy và cài đặt chứng chỉ SSL miễn phí cho tên miền chúng ta.
    </p>
    <p>
      Let's Encrypt là một Certificate Authority (CA) - Cơ quan cấp chứng chỉ, chúng ta có thể dễ
      dàng lấy chứng chỉ SSL miễn phí để kích hoạt mã hóa HTTPS trên web server. Điều này thực hiện
      đơn giản thông qua phần mềm Cerbot.
    </p>
    <p>Ok, bắt đầu thôi.</p>
    <h3 id="cai-certbot-va-lay-chung-chi-ssl">🥈<!-- -->Cài Certbot và lấy chứng chỉ SSL</h3>
    <p>
      Hướng dẫn mình lấy
      <a
        rel="noopener noreferrer nofollow"
        title="từ đây thôi"
        href="https://certbot.eff.org/instructions?ws=nginx&amp;os=ubuntufocal"
        >từ đây thôi</a
      >
    </p>
    <p>1.Cài Snapd</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">apt</span><span class="token plain"> update</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">apt</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">install</span><span class="token plain"> snapd</span></div></pre>
    </div>
    <p>
      2.Nếu trước đó đã cài Certbot, hãy gỡ nó đi (nếu VPS mới toanh hoặc không biết gì thì bỏ qua
      bước này)
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">apt-get</span><span class="token plain"> remove certbot</span></div></pre>
    </div>
    <p>3.Cài Certbot</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> snap </span><span class="token function" style="color:rgb(80, 250, 123)">install</span><span class="token plain"> --classic certbot</span></div></pre>
    </div>
    <p>4.Chuẩn bị cerbot command</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">ln</span><span class="token plain"> -s /snap/bin/certbot /usr/bin/certbot</span></div></pre>
    </div>
    <p>5.Cài và lấy chứng chỉ</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> certbot --nginx</span></div></pre>
    </div>
    <blockquote>
      <p>
        Hãy chắc chắn với mình rằng bạn đã trỏ tên miền về VPS thành công nhé, nếu chưa thì sẽ bị
        lỗi đấy!
      </p>
    </blockquote>
    <p>
      Bởi vì đây là lần đầu bạn chạy Cerbot trên server này, nó sẽ yêu cầu bạn enter địa chỉ email
      và yêu cầu bạn đồng ý điều khoản.
    </p>
    <p>Sau đó, Certbot sẽ giao tiếp với server của Let's Encrypt để verify domain của bạn.</p>
    <p>Nếu thành công, Certbot sẽ hỏi bạn muốn cấu hình HTTPS như thế nào.</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">Saving debug log to /var/log/letsencrypt/letsencrypt.log</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Enter email address </span><span class="token punctuation" style="color:rgb(248, 248, 242)">(</span><span class="token plain">used </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">for</span><span class="token plain"> urgent renewal and security notices</span><span class="token punctuation" style="color:rgb(248, 248, 242)">)</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"> </span><span class="token punctuation" style="color:rgb(248, 248, 242)">(</span><span class="token plain">Enter </span><span class="token string" style="color:rgb(255, 121, 198)">'c'</span><span class="token plain"> to cancel</span><span class="token punctuation" style="color:rgb(248, 248, 242)">)</span><span class="token plain">: duthanhduoc@gmail.com</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain" style="display:inline-block">
</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Please </span><span class="token builtin class-name" style="color:rgb(189, 147, 249)">read</span><span class="token plain"> the Terms of Service at</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">https://letsencrypt.org/documents/LE-SA-v1.3-September-21-2022.pdf. You must</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">agree </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">in</span><span class="token plain"> order to register with the ACME server. Do you agree?</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token punctuation" style="color:rgb(248, 248, 242)">(</span><span class="token plain">Y</span><span class="token punctuation" style="color:rgb(248, 248, 242)">)</span><span class="token plain">es/</span><span class="token punctuation" style="color:rgb(248, 248, 242)">(</span><span class="token plain">N</span><span class="token punctuation" style="color:rgb(248, 248, 242)">)</span><span class="token plain">o: y</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain" style="display:inline-block">
</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Would you be willing, once your first certificate is successfully issued, to</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">share your email address with the Electronic Frontier Foundation, a founding</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">partner of the Let</span><span class="token string" style="color:rgb(255, 121, 198)">'s Encrypt project and the non-profit organization that</span></div><div class="token-line" style="color:#F8F8F2"><span class="token string" style="color:rgb(255, 121, 198)">develops Certbot? We'</span><span class="token plain">d like to send you email about our work encrypting the web,</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">EFF news, campaigns, and ways to support digital freedom.</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token punctuation" style="color:rgb(248, 248, 242)">(</span><span class="token plain">Y</span><span class="token punctuation" style="color:rgb(248, 248, 242)">)</span><span class="token plain">es/</span><span class="token punctuation" style="color:rgb(248, 248, 242)">(</span><span class="token plain">N</span><span class="token punctuation" style="color:rgb(248, 248, 242)">)</span><span class="token plain">o: y</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Account registered.</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain" style="display:inline-block">
</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Which names would you like to activate HTTPS for?</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">We recommend selecting either all domains, or all domains </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">in</span><span class="token plain"> a VirtualHost/server block.</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token number">1</span><span class="token plain">: edu.duthanhduoc.com</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token number">2</span><span class="token plain">: api.edu.duthanhduoc.com</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token number">3</span><span class="token plain">: www.api.edu.duthanhduoc.com</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"></span><span class="token number">4</span><span class="token plain">: www.edu.duthanhduoc.com</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Select the appropriate numbers separated by commas and/or spaces, or leave input</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">blank to </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">select</span><span class="token plain"> all options shown </span><span class="token punctuation" style="color:rgb(248, 248, 242)">(</span><span class="token plain">Enter </span><span class="token string" style="color:rgb(255, 121, 198)">'c'</span><span class="token plain"> to cancel</span><span class="token punctuation" style="color:rgb(248, 248, 242)">)</span><span class="token plain">:</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Requesting a certificate </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">for</span><span class="token plain"> edu.duthanhduoc.com and </span><span class="token number">3</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">more</span><span class="token plain"> domains</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain" style="display:inline-block">
</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Successfully received certificate.</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Certificate is saved at: /etc/letsencrypt/live/edu.duthanhduoc.com/fullchain.pem</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Key is saved at:         /etc/letsencrypt/live/edu.duthanhduoc.com/privkey.pem</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">This certificate expires on </span><span class="token number">2024</span><span class="token plain">-03-17.</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">These files will be updated when the certificate renews.</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Certbot has </span><span class="token builtin class-name" style="color:rgb(189, 147, 249)">set</span><span class="token plain"> up a scheduled task to automatically renew this certificate </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">in</span><span class="token plain"> the background.</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain" style="display:inline-block">
</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Deploying certificate</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Successfully deployed certificate </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">for</span><span class="token plain"> edu.duthanhduoc.com to /etc/nginx/sites-enabled/edu.duthanhduoc.com</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Successfully deployed certificate </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">for</span><span class="token plain"> api.edu.duthanhduoc.com to /etc/nginx/sites-enabled/api.edu.duthanhduoc.com</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Successfully deployed certificate </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">for</span><span class="token plain"> www.api.edu.duthanhduoc.com to /etc/nginx/sites-enabled/api.edu.duthanhduoc.com</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Successfully deployed certificate </span><span class="token keyword" style="color:rgb(189, 147, 249);font-style:italic">for</span><span class="token plain"> www.edu.duthanhduoc.com to /etc/nginx/sites-enabled/edu.duthanhduoc.com</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">Congratulations</span><span class="token operator">!</span><span class="token plain"> You have successfully enabled HTTPS on https://edu.duthanhduoc.com, https://api.edu.duthanhduoc.com, https://www.api.edu.duthanhduoc.com, and https://www.edu.duthanhduoc.com</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">We were unable to subscribe you the EFF mailing list because your e-mail address appears to be invalid. You can try again later by visiting https://act.eff.org.</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain" style="display:inline-block">
</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">If you like Certbot, please consider supporting our work by:</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"> * Donating to ISRG / Let's Encrypt:   https://letsencrypt.org/donate</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"> * Donating to EFF:                    https://eff.org/donate-le</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain" style="display:inline-block">
</span></div></pre>
    </div>
    <p>Nếu in ra <code>Successfully</code> là thành công rồi.</p>
    <p>
      Chứng chỉ của anh em đã được tải về và cài đặt. Bây giờ thử vào website với url bắt đầu bằng
      <code>https://</code> sẽ thấy thành quả.
    </p>
    <p>Cuối cùng là chúng ta sẽ kiểm tra xem tiến trình tự động làm mới chứng chỉ.</p>
    <p>
      Các chứng chỉ của Let's Encrypt's chỉ có hiệu lực 90 ngày. Vậy nên chúng ta cần tự động lấy
      lại khi nó hết hạn.
    </p>
    <p>
      Package Cerbot mà chúng ta đã cài sẽ giải quyết vấn đề này bằng cách chạy câu lệnh
      <code>certbot renew</code> 2 lần 1 ngày thông qua một bộ hẹn giờ <code>systemd</code>. Tính
      năng này sẽ được cung cấp bởi một script đặt trong <code>/etc/cron.d</code>. Task này sẽ chạy
      2 lần / 1 ngày và sẽ làm mới bất cứ chứng chỉ nào mà sẽ hết hạn trong 30 ngày tới.
    </p>
    <p>Để test tiến trình làm mới tự động, anh em có thể chạy câu lệnh dưới</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> certbot renew --dry-run</span></div></pre>
    </div>
    <p>Nếu không thấy bất cứ lỗi gì tức là thành công.</p>
    <p>
      Khi cần, Certbot sẽ làm mới chứng chỉ và reload Nginx để nhận các thay đổi. Nếu quá trình gia
      hạn tự động không thành công, Let's Encrypt sẽ gửi một thông báo đến email bạn đã chỉ định,
      cảnh báo bạn khi chứng chỉ của bạn sắp hết hạn.
    </p>
    <p>Bây giờ thì website Next.js (hoặc Node.Js) đã được deploy thành công.</p>
    <hr />
    <h2 id="kich-hoat-http2-trong-nginx">🥇<!-- -->Kích hoạt HTTP2 trong Nginx</h2>
    <p>
      HTTP/2 là phiên bản kế thừa của HTTP/1.x và cung cấp nhiều ưu điểm như xử lý song song, full
      multiplex, nén header và thậm chí là cả server push. Điều quan trọng là thiết lập HTTP2 trong
      NGINX để cải thiện tốc độ và hiệu suất trang web.
    </p>
    <p>Trước khi kích hoạt thì cần đảm bảo rằng</p>
    <ul>
      <li>
        <div>
          Bạn đang sử dụng Nginx 1.9.5 hoặc hơn. Có thể kiểm tra version bằng câu lệnh
          <code>nginx -v</code>
        </div>
      </li>
      <li><div>Bạn đã kích hoạt HTTPS/SSL.</div></li>
    </ul>
    <p>
      Đầu tiên cần mở file cấu hình Nginx. Thay thế <code>example.com</code> thành tên file cấu hình
      của bạn
    </p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> </span><span class="token function" style="color:rgb(80, 250, 123)">nano</span><span class="token plain"> /etc/nginx/sites-enabled/example.com</span></div></pre>
    </div>
    <p>Nếu đã kích hoạt SSL trong Nginx rồi thì sẽ có cái dòng này</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">listen </span><span class="token number">443</span><span class="token plain"> ssl</span><span class="token punctuation" style="color:rgb(248, 248, 242)">;</span><span class="token plain"></span></div></pre>
    </div>
    <p>Thêm cái <code>http2</code> ở phía cuối trước cái dấu <code>;</code> để thành như thế này</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">listen </span><span class="token number">443</span><span class="token plain"> ssl http2</span><span class="token punctuation" style="color:rgb(248, 248, 242)">;</span><span class="token plain"></span></div></pre>
    </div>
    <p>Cuối cùng thì nó sẽ có dạng như thế này</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token plain">server </span><span class="token punctuation" style="color:rgb(248, 248, 242)">{</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">    listen </span><span class="token number">443</span><span class="token plain"> ssl http2</span><span class="token punctuation" style="color:rgb(248, 248, 242)">;</span><span class="token plain"></span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">    ssl_certificate </span><span class="token punctuation" style="color:rgb(248, 248, 242)">..</span><span class="token plain">.</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain">    ssl_certificate_key </span><span class="token punctuation" style="color:rgb(248, 248, 242)">..</span><span class="token plain">.</span></div><div class="token-line" style="color:#F8F8F2"><span class="token plain"> </span><span class="token punctuation" style="color:rgb(248, 248, 242)">}</span><span class="token plain"></span></div></pre>
    </div>
    <p>Kiểm tra lại file cấu hình có đúng không</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> nginx -t</span></div></pre>
    </div>
    <p>Restart lại Nginx Server</p>
    <div class="codeBlock">
      <div class="languageCode">bash</div>
      <button class="copyCode">Copy</button>
      <pre
        class="prism-code language-bash customScrollbar"
      ><div class="token-line" style="color:#F8F8F2"><span class="token function" style="color:rgb(80, 250, 123)">sudo</span><span class="token plain"> systemctl restart nginx</span></div></pre>
    </div>
    <p>
      Để test HTTP2 thì vào
      <a
        rel="noopener noreferrer nofollow"
        title="keycnd"
        href="https://tools.keycdn.com/http2-test"
        >keycnd</a
      >
    </p>
    <hr />
    <h2 id="tom-lai">🥇<!-- -->Tóm lại</h2>
    <p>
      Cuối cùng thành chúng ta đã hoàn thành việc triển khai ứng dụng Next.Js (hoặc Node.Js) lên môi
      trường Internet với một custom domain, mã hóa HTTPS/SSL, và Nginx reverse proxy trên một VPS
      của Vultr. AE cũng biết cách cập nhật lại website nếu có thay đổi gì trong tương lai.
    </p>
    <p>Cảm ơn anh em đã đọc đến đây, chúc ae thành công 🚀</p>
    <hr />
    <h2 id="tham-khao">🥇<!-- -->Tham khảo</h2>
    <p>Cảm ơn tài liệu tham khảo từ 💓</p>
    <ul>
      <li>
        <div>
          <a
            rel="noopener noreferrer nofollow"
            title="How To Deploy A Next.js Website To A DigitalOcean Server"
            href="https://www.coderrocketfuel.com/article/how-to-deploy-a-next-js-website-to-a-digital-ocean-server"
            >How To Deploy A Next.js Website To A DigitalOcean Server</a
          >
        </div>
      </li>
      <li>
        <div>
          <a
            rel="noopener noreferrer nofollow"
            title="How To Enable HTTP2 in NGINX"
            href="https://ubiq.co/tech-blog/how-to-enable-http2-in-nginx/"
            >How To Enable HTTP2 in NGINX</a
          >
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" src="./index.ts" default />
<style lang="scss" src="./style.scss" />
