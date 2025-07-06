from flask import Flask, render_template, request, redirect, url_for
import mysql.connector
app = Flask(__name__)
def get_connection():
    return mysql.connector.connect(
        host="localhost",
        user="root",
        password="12345678minh",
        database="csdl"
    )

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        try:
            con = get_connection()
            cursor = con.cursor()
            cursor.execute("""
                INSERT INTO sanpham (MaSP, TenSP, MaNhaCC, MaLoaiSP, Donvi, DonGia, Soluong, SoLuongTT, KhuyenMai)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, (
                request.form["MaSP"],
                request.form["TenSP"],
                request.form["MaNhaCC"],
                request.form["MaLoaiSP"],
                request.form["Donvi"],
                request.form["DonGia"],
                request.form["Soluong"],
                request.form["SoLuongTT"],
                request.form["KhuyenMai"]
            ))
            con.commit()
        except Exception as e:
            return f"Lỗi khi thêm sản phẩm: {e}"
        finally:
            cursor.close()
            con.close()
        return redirect(url_for("index"))
    con = get_connection()
    cursor = con.cursor(dictionary=True)
    cursor.execute("SELECT * FROM sanpham")
    products = cursor.fetchall()
    cursor.close()
    con.close()
    return render_template("clgt.html", products=products)
@app.route("/delete/<masp>")
def delete(masp):
    con = get_connection()
    cursor = con.cursor()
    cursor.execute("DELETE FROM sanpham WHERE MaSP = %s", (masp,))
    con.commit()
    cursor.close()
    con.close()
    return redirect(url_for("index"))
@app.route("/edit/<masp>", methods=["GET", "POST"])
def edit(masp):
    con = get_connection()
    cursor = con.cursor(dictionary=True)
        if request.method == "POST":
        cursor.execute("""
            UPDATE sanpham SET TenSP=%s, MaNhaCC=%s, MaLoaiSP=%s, Donvi=%s, DonGia=%s, Soluong=%s, SoLuongTT=%s, KhuyenMai=%s
            WHERE MaSP = %s
        """, (
            request.form["TenSP"],
            request.form["MaNhaCC"],
            request.form["MaLoaiSP"],
            request.form["Donvi"],
            request.form["DonGia"],
            request.form["Soluong"],
            request.form["SoLuongTT"],
            request.form["KhuyenMai"],
            masp
        ))
        con.commit()
        cursor.close()
        con.close()
        return redirect(url_for("index"))
    cursor.execute("SELECT * FROM sanpham WHERE MaSP = %s", (masp,))
    sp = cursor.fetchone()
    cursor.close()
    con.close()
    return render_template("edit.html", sp=sp)
if __name__ == "__main__":
    app.run(debug=True)

