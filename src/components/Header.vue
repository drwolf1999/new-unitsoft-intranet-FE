<template>
    <nav class="blue-grey lighten-2" role="navigation">
        <div class="nav-wrapper container"><a id="logo-container" href="/" class="brand-logo">Intranet</a>
            <ul class="right hide-on-med-and-down">
<!--                슈퍼 유저라면 ? ==> -->
<!--                <li><a href="/teacher/<= mykey %>">내 일지</a></li>-->
                <li><a href="/students">
                    학생
                </a>
                </li>
                <li><a href="/teachers">
                    선생님
                </a>
                </li>
                <li><a href="/lessons">
                    수업
                </a>
                </li>
<!--                 TODO 메세지 서비스 구현 -->
<!--                <li><a href="../message">-->
<!--                메세지-->
<!--                </a>-->
<!--                </li>-->
                <li><a href="/auth/logout">
                    로그아웃
                </a>
                </li>
            </ul>
        </div>
    </nav>
</template>

<script>
    export default {
        name: 'Header',
        props: {},
    };
</script>