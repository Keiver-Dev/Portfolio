# Kerith

### Estructura viva sobre JavaScript real

---

## El problema que todos normalizan

En Node.js, la arquitectura de un proyecto vive en la cabeza del equipo.

Las carpetas son pasivas. Los imports son rutas. No hay ningún mecanismo que haga la arquitectura visible, verificable, o trazable. El resultado es predecible:

- Un developer nuevo tarda semanas en entender cómo está organizado el proyecto
- Mover un módulo rompe imports en lugares que nadie recuerda
- Las dependencias circulares explotan en runtime, no en desarrollo
- Las refactorizaciones se evitan porque el costo es impredecible
- La arquitectura que el equipo acordó en papel no es la que existe en el código

La respuesta del ecosistema hasta ahora ha sido frameworks pesados — NestJS, sistemas de inyección de dependencias, abstracciones que toman el control del runtime. Resuelven el problema de estructura, pero cobran un precio permanente: el container de DI vive en producción, el código le pertenece al framework, y migrar fuera es reescribir el proyecto.

**Kerith toma el camino contrario.**

---

## Qué es Kerith

Kerith es una capa estructural para Node.js y TypeScript que convierte la arquitectura de un proyecto en una entidad operativa del sistema.

No reemplaza Express, Fastify, ni ningún runtime existente. Vive encima. Después del bootstrap, se retira — el runtime corre exactamente como lo haría sin Kerith.

**El developer paga la estructura una sola vez, en el arranque. Después, el runtime es puro.**

En términos concretos, Kerith hace tres cosas:

**Estructura** — los módulos tienen fronteras explícitas, dependencias declaradas, y APIs públicas definidas. `kerith check` las hace cumplir en CI sin ejecutar la aplicación.

**Identidad** — cada módulo tiene un ID persistente que sobrevive renombrados, movimientos, y refactorings agresivos. El sistema sabe que el módulo de hoy es el mismo de hace seis meses, aunque no quede nada en común excepto un archivo de ocho bytes.

**Análisis** — en cualquier momento, `kerith check` produce el estado arquitectural completo del proyecto: qué módulos existen, qué violaciones hay, cómo evolucionó cada módulo.

---

## El código le pertenece al developer, no al framework

Esta es la diferencia filosófica que define a Kerith.

```typescript
// NestJS — sin el framework, este código no tiene sentido
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>
  ) {}
}
```

```typescript
// Kerith — sin Kerith, este código sigue siendo TypeScript válido
Service('users')
export class UsersService {
  async findAll() {
    return db.users.findAll()
  }
}
```

Con NestJS, el código depende del framework para existir. Con Kerith, el framework depende del código para entenderlo. La diferencia no es estética — tiene consecuencias reales sobre ownership, portabilidad, y lock-in.

---

## Zero lock-in — garantizado

Kerith es el único framework de Node.js que puede decir esto:

**Si el equipo decide no usarlo, `kerith disconnect` traduce el proyecto a Express puro. Sin reescribir nada.**

Los aliases son rutas reales en `tsconfig.json` — sin Kerith, siguen resolviendo. Los identificadores son llamadas a funciones que no modifican el código — sin Kerith importado, son líneas que simplemente no ejecutan. Los controllers se traducen a `app.use(prefix, router)` estándar de Express con un comando.

El peor escenario de adoptar Kerith es instalar, no gustar, correr un comando, y seguir con Express como antes. Ese nivel de reversibilidad elimina el principal riesgo de adopción para cualquier equipo.

---

## El sistema de identidad persistente — NITS

NITS (Kerith Identity Tracking System) es el componente más estratégico de Kerith.

Cada módulo lleva un archivo `.kerith` en su carpeta:

```json
{ "id": "mod_a1b2c3d4", "name": "users", "createdAt": "2026-01-01T00:00:00Z" }
```

Este archivo se commitea a Git. Cuando el módulo se mueve o renombra, el archivo se mueve con él. El sistema confirma que es el mismo módulo con certeza del 100% — sin heurísticas, sin ambigüedad.

**Mover un módulo de dominio ya no es una operación de riesgo. Es un evento registrado, trazable, y reversible.**

El registry versionado en Git acumula la historia completa de la arquitectura: cuándo se creó cada módulo, cuándo se movió, cómo evolucionó. Esa historia es la base del dashboard SaaS futuro.

---

## Rendimiento sin compromiso

Kerith no existe en el camino crítico de ningún request en producción.

Esto tiene consecuencias medibles:

**Serverless** — el cold start es comparable a Express puro. No hay container de DI inicializando instancias en cada arranque en frío.

**Proyectos grandes** — más módulos significan más tiempo de bootstrap, cero impacto en latencia de requests. La complejidad arquitectónica no se traslada al usuario final.

**Benchmarks** — una aplicación con Kerith y una sin Kerith muestran la misma latencia de request. La diferencia está solo en el bootstrap, que ocurre una vez.

---

## Para el tech lead

Kerith resuelve el problema que hoy se resuelve con disciplina de equipo y code reviews.

Las reglas que hoy son convenciones informales — "no importes directamente de otro módulo", "declara tus dependencias", "no hagas imports circulares" — pasan a ser contratos que el tooling hace cumplir automáticamente en cada commit.

```bash
kerith check --strict
# Sale con exit code 1 si hay violaciones — bloquea el merge
```

El developer nuevo que llega al proyecto no necesita que nadie le explique la arquitectura. `kerith check` se la muestra. Y si comete una violación de frontera, la detecta en su editor antes de hacer el commit.

---

## Para el ejecutivo

Kerith convierte la arquitectura en un activo trazable.

La pregunta "¿cómo está organizado este proyecto y cómo evolucionó?" hoy no tiene respuesta automatizada. Depende de quien lleva más tiempo en el equipo, de los commits de Git, de documentación que rara vez está actualizada.

Con Kerith, esa información existe en el registry y es consultable en cualquier momento — sin depender de ninguna persona específica.

El proyecto es open source con licencia MIT. No crea lock-in. No requiere infraestructura adicional. Si el equipo decide no continuar usándolo, el código sigue funcionando sin modificaciones.

---

## El ecosistema

```
@kerith/core          — estructura, identidad, CLI, aliases — universal
@kerith/eslint-plugin — validación arquitectónica en el editor
@kerith/create        — scaffolding interactivo de proyectos
@kerith/app           — framework completo, alternativa a NestJS — roadmap
```

**`@kerith/core`** funciona sobre cualquier proyecto Node.js existente sin cambiar el código. Es el punto de entrada al ecosistema.

**`@kerith/eslint-plugin`** lleva las mismas reglas de `kerith check` al editor — las violaciones aparecen inline mientras se escribe.

**`@kerith/create`** genera proyectos Kerith desde cero con todo configurado.

**`@kerith/app`** es el framework completo — el equivalente filosófico de NestJS pero sin DI container, sin reflection, y sin lock-in. En roadmap activo.

---

## Modelo de negocio

Kerith es open-core. El núcleo es MIT y siempre lo será.

La capa gratuita incluye todo lo que un equipo necesita para trabajar: estructura, identidad, análisis, CLI, ESLint plugin, y scaffolding.

La capa de pago — el dashboard SaaS — agrega visualización del grafo arquitectónico, historial de identidad NITS navegable, integración con CI/CD, y alertas configurables sobre salud arquitectónica. Es valor incremental sobre una base gratuita completa — no acceso restringido a funcionalidad básica.

**La línea que no se cruza:** el análisis es siempre gratuito y completo. Lo que el dashboard agrega es comodidad, historial, y visualización — no información que el CLI oculta.

---

## Estado actual

Kerith está en desarrollo activo bajo Vlynk Studios. Construcción unipersonal con disciplina de equipo.

|||
|---|---|
|Versión actual|`@kerith/core` v1.8.2|
|Tests|35+ unitarios e integración, cobertura ≥ 80%|
|Licencia|MIT|
|Node.js|≥ 20.6|
|Lanzamiento público|V2.0.0 — Q2 2026|

El proyecto no es un experimento. Está en uso en producción como caso de prueba real en Vlynk, el SaaS privado de Vlynk Studios — una aplicación con arquitectura de dominios compleja que es exactamente el target de Kerith.

---

## La frase que resume todo

> Kerith no crea dependencia.  
> Si un día el equipo decide no usarlo, el proyecto sigue siendo Node.js puro.  
> Esa garantía no existe en ningún otro framework del ecosistema.

---

_Kerith — Built by Vlynk Studios — Licencia MIT_  
_kerith.dev · docs.kerith.dev_