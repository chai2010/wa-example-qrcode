
// Auto generated by Wa Compiler, DONOT EDIT!!!

class WaApp {
  constructor(url) {
    let app = this;
    this._wasm_inst = null;
    this._wa_print_buf = "";

    this._mem_util = new function() {
      this.mem = () => { return app._wasm_inst.exports.memory; }
      this.mem_view = (addr, len) => { return new DataView(this.mem().buffer, addr, len); }
      this.mem_array_u8 = (addr, len) => { return new Uint8Array(this.mem().buffer, addr, len); }

      this.get_string = (d, l) => { return new TextDecoder("utf-8").decode(this.mem_view(d, l)); }
      this.set_string = (s) => {
        const bytes = new TextEncoder("utf-8").encode(s);
        const l = bytes.length;
        const b = app._wasm_inst.exports["runtime.Block.HeapAlloc"](l, 0, 1);
        const d = b + 16;
        this.mem_array_u8(d, l).set(bytes);
        return [b, d, l]
      }

      this.block_release = (addr) => { app._wasm_inst.exports["runtime.Block.Release"](addr); }

      //基本类型直接读写：
      this.bool_load = (addr) => { /*Todo*/ }
      this.bool_store = (addr, v) => { /*Todo*/ }
      this.u8_load = (addr) => { /*Todo*/ }
      this.u8_store = (addr, v) => { /*Todo*/ }
      this.u16_load = (addr) => { /*Todo*/ }
      this.u16_store = (addr, v) => { /*Todo*/ }
      this.u32_load = (addr) => { /*Todo*/ }
      this.u32_store = (addr, v) => { /*Todo*/ }
      this.i32_load = (addr) => { return app._wasm_inst.exports["runtime.i32_load"](addr); }
      this.i32_store = (addr, v) => { app._wasm_inst.exports["runtime.i32_store"](addr, v); }
      this.rune_load = (addr) => { /*Todo*/ }
      this.rune_store = (addr, v) => { /*Todo*/ }
      this.u64_load = (addr) => { /*Todo*/ }
      this.u64_store = (addr, v) => { /*Todo*/ }
      this.i64_load = (addr) => { /*Todo*/ }
      this.i64_store = (addr, v) => { /*Todo*/ }
      this.f32_load = (addr) => { return app._wasm_inst.exports["runtime.f32_load"](addr); }
      this.f32_store = (addr, v) => { app._wasm_inst.exports["runtime.f32_store"](addr, v); }
      this.f64_load = (addr) => { return app._wasm_inst.exports["runtime.f64_load"](addr); }
      this.f64_store = (addr, v) => { app._wasm_inst.exports["runtime.f64_store"](addr, v); }
      this.string_load = (addr) => {
        const d = this.i32_load(addr + 4)
        const l = this.i32_load(addr + 8)
        return this.get_string(d, l);
      }
      this.string_store = (addr, v) => {
        const b = this.i32_load(addr)
        this.block_release(b)
        let ns = this.set_string(v)
        this.i32_store(addr, ns[0])
        this.i32_store(addr + 4, ns[1])
        this.i32_store(addr + 8, ns[2])
      }

      //返回值提取：
      this.extract_string = (arr) => {
        const s = this.get_string(arr[1], arr[2]);
        this.block_release(arr[0])
        arr.splice(0, 3)
        return s
      }
      this.extract_bool = (arr) => {
        //Todo
        arr.splice(0, 1)
        return 0
      }
      this.extract_u8 = (arr) => {
        //Todo
        arr.splice(0, 1)
        return 0
      }
      this.extract_u16 = (arr) => {
        //Todo
        arr.splice(0, 1)
        return 0
      }
      this.extract_u32 = (arr) => {
        //Todo
        arr.splice(0, 1)
        return 0
      }
      this.extract_i32 = (arr) => {
        const v = arr[0]
        arr.splice(0, 1)
        return v
      }
      this.extract_rune = (arr) => {
        //Todo
        arr.splice(0, 1)
        return 0
      }
      this.extract_f32 = (arr) => {
        const v = arr[0]
        arr.splice(0, 1)
        return 0
      }
      this.extract_f64 = (arr) => {
        const v = arr[0]
        arr.splice(0, 1)
        return 0
      }
    }

    let syscall = new function() {
      this.print_bool = (b) => { app._wa_print_buf += Boolean(b) }
      this.print_u32 = (i) => { app._wa_print_buf += i }
      this.print_i32 = (i) => { app._wa_print_buf += i }
      this.print_u64 = (i) => { app._wa_print_buf += i }
      this.print_i64 = (i) => { app._wa_print_buf += i }
      this.print_f32 = (f) => { app._wa_print_buf += f }
      this.print_f64 = (f) => { app._wa_print_buf += f }
      this.print_ptr = (p) => { app._wa_print_buf += p }
      this.print_str = (addr, len) => { app._wa_print_buf += app._mem_util.get_string(addr, len) }
      this.proc_exit = (code) => { alert(code) }
      this.print_rune = (c) => {
        let ch = String.fromCodePoint(c);
        if (ch == '\n') {
          console.log(app._wa_print_buf);
          app._wa_print_buf = "";
        }
        else {
          app._wa_print_buf += ch
        }
      }
    }

    let extobj = new function () {
      this._obj_buf = [{}];
      this._free_ids = [];
      this.new_obj = () => {
        let obj = {}
        let h = this._free_ids.length > 0
          ? this._free_ids.pop()
          : this._obj_buf.length
        this._obj_buf[h] = obj;
        return h
      }
      this.free_obj = (h) => {
        let obj = this._obj_buf[h];
        // obj.free(); // TODO: 释放资源
        this._obj_buf[h] = null;
        this._free_ids.push(h);
      }
      this.set_member_i32 = (h, member_name_b, member_name_d, member_name_l, value) => {
        let member_name = app._mem_util.get_string(member_name_d, member_name_l);
        this._obj_buf[h][member_name] = value;
      }
      this.set_member_string = (h, name_b, name_d, name_l, value_b, value_d, value_l) => {
        let name = app._mem_util.get_string(name_d, name_l);
        let value = app._mem_util.get_string(value_d, value_l);
        this._obj_buf[h][name] = value;
      }
      this.set_member_obj = (h, member_name_b, member_name_b, member_name_l, value) => {
        let member_name = app._mem_util.get_string(member_name_d, member_name_l);
        this._obj_buf[h][member_name] = this._obj_buf[value];
      }
      this.new_array = () => {
        let arr = [];
        let h = this._free_ids.length > 0
          ? this._free_ids.pop()
          : this._obj_buf.length
        this._obj_buf[h] = arr
        return h
      }
      this.append_i32 = (h, value) => {
        this._obj_buf[h].push(value);
      }
      this.append_string = (h, value_b, value_d, value_l) => {
        let value = app._mem_util.get_string(value_d, value_l);
        this._obj_buf[h].push(value);
      }
      this.append_obj = (h, value) => {
        this._obj_buf[h].push(this._obj_buf[value]);
      }
    }

    let imports = {
      syscall_js: syscall,
      new_obj: extobj
    }

    WebAssembly.instantiateStreaming(fetch(url), imports).then(res => {
      this._wasm_inst = res.instance;
      this._wasm_inst.exports._start();
    })

  }  // constructor
}  // class WaApp