import { component$ } from "@builder.io/qwik";
import { useServerTimeLoader } from "../../../routes/layout";

export default component$(() => {
  const serverTime = useServerTimeLoader();
  return (
    <footer class="footer footer-center bg-base-300 p-4 text-base-content">
      <aside>
        <p>
          Built {serverTime.value.date} @ {serverTime.value.time}
        </p>
      </aside>
    </footer>
  );
});