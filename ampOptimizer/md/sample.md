# ArchUnit

[https://www.archunit.org/:embed:cite]

> ArchUnit is a free, simple and extensible library for checking the architecture of your Java code using any plain Java unit test framework. That is, ArchUnit can check dependencies between packages and classes, layers and slices, check for cyclic dependencies and more. It does so by analyzing given Java bytecode, importing all classes into a Java code structure.

Javaのアーキテクチャをテストできるライブラリで、パッケージやクラス、レイヤー、スライス（？）の依存関係をテストできるそうです。
そこで、親の顔よりも見たこの図をテストしたいと思います。

[https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg:image=https://blog.cleancoder.com/uncle-bob/images/2012-08-13-the-clean-architecture/CleanArchitecture.jpg]
※ [https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html]

# TypescriptでもArchUnitしたい

ArchUnitはJava製です。私はTypescriptのArchUnitがしたいです。
そこで、良さげなライブラリを発見しました。

[https://github.com/MaibornWolff/ts-arch:embed:cite]

特に拘りなく、アーキテクチャのテストができれば何でも良いかなと思います。
極端な話、ソースコードをASTパースし、依存関係を抽出できれば自作できるんじゃないかと思います。

# 試してみた

試したソースコードは、下記に置いています。ご参考下さい。

[https://github.com/Silver-birder/try-archunit:embed:cite]

全体のソースコードツリーは次の構成です。

```
src
└ 1_enterprise_business_rules
  └ entities
    └ Entity.ts
└ 2_application_business_rules
  └ use_cases
    └ UseCase.ts
└ 3_interface_adapters
  └ controllers
    └ Controller.ts
  └ gateways
    └ Gateway.ts
  └ presenters
    └ Presenter.ts
└ 4_frameworks_and_drivers
  └ web
    └ Web.ts
└ clean_architecture.puml
└ clean_architecture.test.ts
```

各プロダクトコードは、下の階層のファイルをimportしているだけとします。

```typescript
// src/4_frameworks_and_drivers/web/Web.ts
import "../../3_interface_adapters/gateways/Gateway"
import "../../3_interface_adapters/controllers/Controller"
import "../../3_interface_adapters/presenters/Presenter"
```

```typescript
// src/3_interface_adapters/controllers/Controller.ts
import "../../2_application_business_rules/use_cases/UseCase"
```

```typescript
// src/2_application_business_rules/use_cases/UseCase.ts
import "../../1_enterprise_business_rules/entities/Entity"
```

```typescript
// src/1_enterprise_business_rules/entities/Entity.ts
```

下記ファイルにあるUMLのコンポーネント図で依存関係を表します。

```{plantuml}
# clean_architecture.puml
@startuml
  component [4_frameworks_and_drivers] #Blue
  component [3_interface_adapters] #Green
  component [2_application_business_rules] #Red
  component [1_enterprise_business_rules] #Yellow

  4_frameworks_and_drivers --> 3_interface_adapters
  3_interface_adapters --> 2_application_business_rules
  2_application_business_rules --> 1_enterprise_business_rules
@enduml
```

UMLを可視化すると、下記の図のとおりです。

<figure class="figure-image figure-image-fotolife" title="clean_architecture.puml">[f:id:silverbirder180:20201128114839p:plain]<figcaption>clean_architecture.puml</figcaption></figure>

テストコードは、下記のとおりです。

```typescript
// clean_architecture.test.ts
describe("architecture", () => {
    it("Check dependency", async () => {
        const architectureUml = path.resolve(__dirname, "clean_architecture.puml");
        const violations = await slicesOfProject()
            .definedBy("src/(**)/")
            .should()
            .adhereToDiagramInFile(architectureUml)
            .check();
        await expect(violations).toEqual([])
    });
});
```

このテストケースはPASSします。
<figure class="figure-image figure-image-fotolife" title="src/clean_architecture.test.ts &gt; architecture &gt; Check dependency #Succeed">[f:id:silverbirder180:20201128115326p:plain]<figcaption>src/clean_architecture.test.ts &gt; architecture &gt; Check dependency #Succeed</figcaption></figure>

では、違反コードを書いてみます。

```typescript
// src/3_interface_adapters/controllers/Controller.ts
import "../../2_application_business_rules/use_cases/UseCase"
import "../../4_frameworks_and_drivers/web/Web"
```

3レイヤーが上位の4レイヤーを使用しています。この状態でテストを実行すると、

<figure class="figure-image figure-image-fotolife" title="src/clean_architecture.test.ts &gt; architecture &gt; Check dependency #Failed">[f:id:silverbirder180:20201128115543p:plain]<figcaption>src/clean_architecture.test.ts &gt; architecture &gt; Check dependency #Failed</figcaption></figure>


見事Failedとなりました。つまり、依存関係の誤りを自動的に検出することができます。

# 最後に
規模が大きなプロジェクトほど、依存関係が複雑になりがちです。(Javaでいう) パッケージやクラスの依存関係を適切に設計できていたとしても、誰かが壊しかねません。せっかく設計したのに壊されるのは、とても残念なので、テストコードで守ってあげましょう！
