--
-- PostgreSQL database dump
--

-- Dumped from database version 16.2 (Debian 16.2-1.pgdg120+2)
-- Dumped by pg_dump version 16.2 (Debian 16.2-1.pgdg120+2)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: amenities; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.amenities (
    amenity_id integer NOT NULL,
    amenity_name character varying(255) NOT NULL
);




--
-- Name: amenities_amenities_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.amenities_amenities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: amenities_amenities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.amenities_amenities_id_seq OWNED BY public.amenities.amenity_id;


--
-- Name: comments; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.comments (
    comment_id integer NOT NULL,
    post_id character varying(50) NOT NULL,
    content text NOT NULL,
    rating real NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    user_id integer NOT NULL
);



--
-- Name: comments_comment_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.comments_comment_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: comments_comment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.comments_comment_id_seq OWNED BY public.comments.comment_id;


--
-- Name: contacts; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.contacts (
    contact_id integer NOT NULL,
    full_name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    phone character varying(50) NOT NULL,
    message text NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);




--
-- Name: contact_contact_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.contact_contact_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: contact_contact_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.contact_contact_id_seq OWNED BY public.contacts.contact_id;


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.favorites (
    favorite_id integer NOT NULL,
    user_id integer NOT NULL,
    post_id character varying(50) NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);




--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.favorites_favorite_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.favorites_favorite_id_seq OWNED BY public.favorites.favorite_id;


--
-- Name: knex_migrations; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.knex_migrations (
    id integer NOT NULL,
    name character varying(255),
    batch integer,
    migration_time timestamp with time zone
);




--
-- Name: knex_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.knex_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: knex_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.knex_migrations_id_seq OWNED BY public.knex_migrations.id;


--
-- Name: knex_migrations_lock; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.knex_migrations_lock (
    index integer NOT NULL,
    is_locked integer
);




--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.knex_migrations_lock_index_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.knex_migrations_lock_index_seq OWNED BY public.knex_migrations_lock.index;


--
-- Name: post_type; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.post_type (
    post_type_id integer NOT NULL,
    post_type_name character varying(50) NOT NULL
);




--
-- Name: post_type_post_type_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.post_type_post_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: post_type_post_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.post_type_post_type_id_seq OWNED BY public.post_type.post_type_id;


--
-- Name: posts; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.posts (
    post_id character varying(50) NOT NULL,
    room_id integer NOT NULL,
    user_id integer NOT NULL,
    post_type_id integer NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    expired_in date,
    is_approved boolean DEFAULT false NOT NULL,
    is_blocked boolean DEFAULT false NOT NULL,
    available boolean DEFAULT true NOT NULL,
    delete_flag boolean DEFAULT false NOT NULL,
    date_range character varying(50),
    time_frame text[]
);




--
-- Name: purchase_history; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.purchase_history (
    history_id integer NOT NULL,
    user_id integer,
    service_id integer,
    service_expiry_date timestamp with time zone,
    purchase_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);




--
-- Name: purchase_history_history_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.purchase_history_history_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: purchase_history_history_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.purchase_history_history_id_seq OWNED BY public.purchase_history.history_id;


--
-- Name: roles; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    role_name character varying(50) NOT NULL
);




--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- Name: room; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.room (
    room_id integer NOT NULL,
    title character varying(255) NOT NULL,
    description text,
    location character varying(255) NOT NULL,
    location_codes character varying[] DEFAULT '{0,0,0}'::character varying[] NOT NULL
);




--
-- Name: room_amenities; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.room_amenities (
    rooms_amenities_id integer NOT NULL,
    amenity_id integer NOT NULL,
    room_id integer NOT NULL
);




--
-- Name: room_detail; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.room_detail (
    room_detail_id integer NOT NULL,
    room_id integer NOT NULL,
    room_type_id integer NOT NULL,
    capacity integer NOT NULL,
    area integer NOT NULL,
    gender character varying(255) DEFAULT 'M'::character varying NOT NULL,
    price integer
);




--
-- Name: room_detail_room_detail_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.room_detail_room_detail_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: room_detail_room_detail_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.room_detail_room_detail_id_seq OWNED BY public.room_detail.room_detail_id;


--
-- Name: room_images; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.room_images (
    room_images_id integer NOT NULL,
    room_id integer NOT NULL,
    image_url character varying(255) NOT NULL
);




--
-- Name: room_images_room_images_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.room_images_room_images_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: room_images_room_images_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.room_images_room_images_id_seq OWNED BY public.room_images.room_images_id;


--
-- Name: room_room_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.room_room_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: room_room_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.room_room_id_seq OWNED BY public.room.room_id;


--
-- Name: room_type; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.room_type (
    room_type_id integer NOT NULL,
    room_type_name character varying(50) NOT NULL
);




--
-- Name: room_type_room_type_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.room_type_room_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: room_type_room_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.room_type_room_type_id_seq OWNED BY public.room_type.room_type_id;


--
-- Name: rooms_amenities_rooms_amenities_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.rooms_amenities_rooms_amenities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: rooms_amenities_rooms_amenities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.rooms_amenities_rooms_amenities_id_seq OWNED BY public.room_amenities.rooms_amenities_id;


--
-- Name: services; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.services (
    service_id integer NOT NULL,
    service_name character varying(255) NOT NULL,
    price_per_day integer NOT NULL,
    price_per_week integer NOT NULL,
    price_per_month integer NOT NULL,
    advantages text,
    title_color character varying(255),
    auto_approval boolean DEFAULT false,
    prominent_badge boolean DEFAULT false,
    period character varying(255),
    num_purchases integer DEFAULT 0
);




--
-- Name: services_service_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.services_service_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: services_service_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.services_service_id_seq OWNED BY public.services.service_id;


--
-- Name: transactions; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.transactions (
    transaction_id integer NOT NULL,
    user_id integer NOT NULL,
    amount bigint NOT NULL,
    transaction_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    transaction_code character varying(100),
    transaction_info character varying(255),
    status character varying(255) NOT NULL
);




--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.transactions_transaction_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.transactions_transaction_id_seq OWNED BY public.transactions.transaction_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    user_name character varying(50) NOT NULL,
    email character varying(50) NOT NULL,
    hashed_password character varying(255) NOT NULL,
    phone character varying(50) NOT NULL,
    role_id integer NOT NULL,
    avatar character varying(255),
    balance integer DEFAULT 0,
    is_blocked boolean DEFAULT false NOT NULL,
    service_expiry_date timestamp with time zone,
    service_id integer DEFAULT 4 NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);




--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: viewing_requests; Type: TABLE; Schema: public; Owner: root
--

CREATE TABLE public.viewing_requests (
    request_id integer NOT NULL,
    post_id character varying(50) NOT NULL,
    request_date date NOT NULL,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    time_frame character varying(255) NOT NULL,
    user_id integer NOT NULL,
    is_approved boolean DEFAULT false NOT NULL,
    note character varying(255),
    is_cancelled boolean DEFAULT false NOT NULL,
    cancelled_reason character varying(255)
);




--
-- Name: viewing_requests_request_id_seq; Type: SEQUENCE; Schema: public; Owner: root
--

CREATE SEQUENCE public.viewing_requests_request_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;




--
-- Name: viewing_requests_request_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: root
--

ALTER SEQUENCE public.viewing_requests_request_id_seq OWNED BY public.viewing_requests.request_id;


--
-- Name: amenities amenity_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.amenities ALTER COLUMN amenity_id SET DEFAULT nextval('public.amenities_amenities_id_seq'::regclass);


--
-- Name: comments comment_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comments ALTER COLUMN comment_id SET DEFAULT nextval('public.comments_comment_id_seq'::regclass);


--
-- Name: contacts contact_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.contacts ALTER COLUMN contact_id SET DEFAULT nextval('public.contact_contact_id_seq'::regclass);


--
-- Name: favorites favorite_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.favorites ALTER COLUMN favorite_id SET DEFAULT nextval('public.favorites_favorite_id_seq'::regclass);


--
-- Name: knex_migrations id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.knex_migrations ALTER COLUMN id SET DEFAULT nextval('public.knex_migrations_id_seq'::regclass);


--
-- Name: knex_migrations_lock index; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.knex_migrations_lock ALTER COLUMN index SET DEFAULT nextval('public.knex_migrations_lock_index_seq'::regclass);


--
-- Name: post_type post_type_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.post_type ALTER COLUMN post_type_id SET DEFAULT nextval('public.post_type_post_type_id_seq'::regclass);


--
-- Name: purchase_history history_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.purchase_history ALTER COLUMN history_id SET DEFAULT nextval('public.purchase_history_history_id_seq'::regclass);


--
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- Name: room room_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room ALTER COLUMN room_id SET DEFAULT nextval('public.room_room_id_seq'::regclass);


--
-- Name: room_amenities rooms_amenities_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_amenities ALTER COLUMN rooms_amenities_id SET DEFAULT nextval('public.rooms_amenities_rooms_amenities_id_seq'::regclass);


--
-- Name: room_detail room_detail_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_detail ALTER COLUMN room_detail_id SET DEFAULT nextval('public.room_detail_room_detail_id_seq'::regclass);


--
-- Name: room_images room_images_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_images ALTER COLUMN room_images_id SET DEFAULT nextval('public.room_images_room_images_id_seq'::regclass);


--
-- Name: room_type room_type_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_type ALTER COLUMN room_type_id SET DEFAULT nextval('public.room_type_room_type_id_seq'::regclass);


--
-- Name: services service_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.services ALTER COLUMN service_id SET DEFAULT nextval('public.services_service_id_seq'::regclass);


--
-- Name: transactions transaction_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.transactions ALTER COLUMN transaction_id SET DEFAULT nextval('public.transactions_transaction_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Name: viewing_requests request_id; Type: DEFAULT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.viewing_requests ALTER COLUMN request_id SET DEFAULT nextval('public.viewing_requests_request_id_seq'::regclass);


--
-- Data for Name: amenities; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.amenities VALUES (1, 'Wifi');
INSERT INTO public.amenities VALUES (2, 'Điều hòa');
INSERT INTO public.amenities VALUES (3, 'Chỗ để xe');
INSERT INTO public.amenities VALUES (4, 'TV');
INSERT INTO public.amenities VALUES (5, 'Tủ lạnh');
INSERT INTO public.amenities VALUES (6, 'Máy giặt');
INSERT INTO public.amenities VALUES (7, 'Gần chợ ');
INSERT INTO public.amenities VALUES (8, 'Dọn vệ sinh');
INSERT INTO public.amenities VALUES (9, 'Ban công');
INSERT INTO public.amenities VALUES (11, 'Chổ phơi đồ');
INSERT INTO public.amenities VALUES (14, 'Công viên');


--
-- Data for Name: comments; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.comments VALUES (11, 'e74b816c-d50e-46e9-9eae-db82ef8d40f1', 'Phòng rất đẹp!', 5, '2024-04-30 08:00:24.073583+00', 26);
INSERT INTO public.comments VALUES (12, 'e74b816c-d50e-46e9-9eae-db82ef8d40f1', 'Phòng oke nhé.', 5, '2024-04-30 08:00:58.349637+00', 28);
INSERT INTO public.comments VALUES (14, 'e74b816c-d50e-46e9-9eae-db82ef8d40f1', 'Phòng rất oke nhé', 4, '2024-05-11 08:37:48.238681+00', 29);
INSERT INTO public.comments VALUES (15, '7f68d143-b166-40d3-9de4-50777cd51967', 'phòng rất oke nhé', 4, '2024-05-23 13:00:06.395688+00', 18);
INSERT INTO public.comments VALUES (18, '25302fe2-e1e2-45cc-967e-d48737696b42', 'Phòng rất oke nhá!<br>', 4, '2024-06-11 14:17:48.512741+00', 29);


--
-- Data for Name: contacts; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.contacts VALUES (1, 'John Doe', 'johndoe@example.com', '123456789', 'Hello, I''m interested in your products.', '2024-04-21 08:47:06.827871+00');
INSERT INTO public.contacts VALUES (9, 'Hoàng', 'hoang@gmail.com', '123456789', 'Nothin''', '2024-04-28 06:23:55.124334+00');


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: root
--



--
-- Data for Name: knex_migrations; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.knex_migrations VALUES (16, '20240228074810_create_room_type_table.js', 1, '2024-03-03 09:53:09.84+00');
INSERT INTO public.knex_migrations VALUES (17, '20240228074823_create_post_type_table.js', 2, '2024-03-03 09:53:45.661+00');
INSERT INTO public.knex_migrations VALUES (18, '20240228075221_create_roles_table.js', 3, '2024-03-03 09:54:01.008+00');
INSERT INTO public.knex_migrations VALUES (19, '20240228084527_create_room_table.js', 4, '2024-03-03 09:54:32.269+00');
INSERT INTO public.knex_migrations VALUES (20, '20240228075509_create_users_table.js', 5, '2024-03-03 09:55:20.916+00');
INSERT INTO public.knex_migrations VALUES (21, '20240228075549_create_posts_table.js', 6, '2024-03-03 09:55:31.14+00');
INSERT INTO public.knex_migrations VALUES (27, '20240228075232_create_room_detail_table.js', 7, '2024-03-03 09:56:30.941+00');
INSERT INTO public.knex_migrations VALUES (28, '20240228075239_create_amenities_table.js', 7, '2024-03-03 09:56:30.946+00');
INSERT INTO public.knex_migrations VALUES (29, '20240228075246_create_rooms_amenities_table.js', 7, '2024-03-03 09:56:30.953+00');
INSERT INTO public.knex_migrations VALUES (30, '20240228075253_create_room_images_table.js', 7, '2024-03-03 09:56:30.959+00');
INSERT INTO public.knex_migrations VALUES (31, '20240228075300_create_viewing_requests_table.js', 7, '2024-03-03 09:56:30.967+00');
INSERT INTO public.knex_migrations VALUES (32, '20240228075308_create_favorites_table.js', 7, '2024-03-03 09:56:30.974+00');
INSERT INTO public.knex_migrations VALUES (33, '20240228075313_create_comments_table.js', 7, '2024-03-03 09:56:30.982+00');
INSERT INTO public.knex_migrations VALUES (34, '20240306021719_add_expired_in_to_posts_table.js', 8, '2024-03-06 02:17:45.29+00');
INSERT INTO public.knex_migrations VALUES (37, '20240306022657_create_transactions_table.js', 9, '2024-03-06 02:36:50.339+00');
INSERT INTO public.knex_migrations VALUES (38, '20240306022732_add_balance_to_users_table.js', 9, '2024-03-06 02:36:50.342+00');
INSERT INTO public.knex_migrations VALUES (40, '20240306133330_alter_users_table.js', 10, '2024-03-08 06:56:23.873+00');
INSERT INTO public.knex_migrations VALUES (41, '20240317024222_add_user_id_to_comment_table.js', 11, '2024-03-17 02:50:11.007+00');
INSERT INTO public.knex_migrations VALUES (42, '20240318135813_change_room_detail_table.js', 12, '2024-03-18 14:03:44.785+00');
INSERT INTO public.knex_migrations VALUES (45, '20240324064949_add_is_approved_to_posts_table.js', 13, '2024-03-24 08:41:17.863+00');
INSERT INTO public.knex_migrations VALUES (47, '20240324065000_add_location_codes_to_room_table.js', 14, '2024-03-26 13:29:57.881+00');
INSERT INTO public.knex_migrations VALUES (48, '20240328145043_add_time_frame_to_viewing_requests_table.js', 15, '2024-03-28 14:51:17.028+00');
INSERT INTO public.knex_migrations VALUES (49, '20240329030142_add_user_id_to_viewing_requests_table.js', 16, '2024-03-29 03:03:25.834+00');
INSERT INTO public.knex_migrations VALUES (50, '20240403084803_refactor_transaction_table.js', 17, '2024-04-03 08:52:11.565+00');
INSERT INTO public.knex_migrations VALUES (56, '20240406022139_service_expired_and_is_blocked_to_users_table.js', 18, '2024-04-06 02:32:01.412+00');
INSERT INTO public.knex_migrations VALUES (58, '20240406023026_drop_available_in_room_table.js', 19, '2024-04-06 02:33:39.978+00');
INSERT INTO public.knex_migrations VALUES (60, '20240406031625_create_services_table.js', 20, '2024-04-06 03:38:00.869+00');
INSERT INTO public.knex_migrations VALUES (61, '20240406033139_alter_users_table.js', 21, '2024-04-06 03:42:09.785+00');
INSERT INTO public.knex_migrations VALUES (62, '20240407130824_rename_rooms_amenities_table.js', 22, '2024-04-07 13:08:40.448+00');
INSERT INTO public.knex_migrations VALUES (63, '20240409134002_add_is_approved_to_viewing_requests_table.js', 23, '2024-04-09 13:41:04.83+00');
INSERT INTO public.knex_migrations VALUES (64, '20240414134513_add_period_to_services_table.js', 24, '2024-04-14 13:47:21.054+00');
INSERT INTO public.knex_migrations VALUES (65, '20240405152608_add_is_block_to_posts_table.js', 25, '2024-04-18 08:08:05.565+00');
INSERT INTO public.knex_migrations VALUES (66, '20240421022355_add_note_to_viewing_requests_table.js', 26, '2024-04-21 02:25:55.284+00');
INSERT INTO public.knex_migrations VALUES (67, '20240421083325_create_contact_table.js', 27, '2024-04-21 08:37:04.045+00');
INSERT INTO public.knex_migrations VALUES (68, '20240505022400_add_delete_flag_to_posts_table.js', 28, '2024-05-05 02:27:25.52+00');
INSERT INTO public.knex_migrations VALUES (69, '20240507135540_add_created_at_to_users.js', 29, '2024-05-07 13:57:02.411+00');
INSERT INTO public.knex_migrations VALUES (70, '20240507142219_add_num_purchases_to_services.js', 30, '2024-05-07 14:24:00.777+00');
INSERT INTO public.knex_migrations VALUES (72, '20240512024303_create_purchase_history_table.js', 31, '2024-05-12 03:22:42.001+00');
INSERT INTO public.knex_migrations VALUES (74, '20240519022554_add_is_cancelled_to_viewing_requests_table.js', 32, '2024-05-19 02:58:09.516+00');
INSERT INTO public.knex_migrations VALUES (76, '20240522080405_refactor_transactions_table.js', 33, '2024-05-22 08:22:09.552+00');


--
-- Data for Name: knex_migrations_lock; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.knex_migrations_lock VALUES (1, 0);


--
-- Data for Name: post_type; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.post_type VALUES (1, 'Cho thuê');
INSERT INTO public.post_type VALUES (2, 'Tìm ở ghép');


--
-- Data for Name: posts; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.posts VALUES ('87f3c0ef-fbc6-430c-8042-6c53ffc29a98', 19, 18, 1, '2024-05-04 08:56:20.680656+00', NULL, false, false, true, false, NULL, NULL);
INSERT INTO public.posts VALUES ('b701f8ef-8aa0-4243-918e-e669b553d194', 22, 29, 2, '2024-05-04 09:41:34.639121+00', NULL, false, false, true, false, NULL, NULL);
INSERT INTO public.posts VALUES ('81463626-db42-4a7d-b153-01b55dd2d141', 23, 28, 2, '2024-05-04 09:53:12.618729+00', NULL, false, false, true, false, NULL, NULL);
INSERT INTO public.posts VALUES ('25302fe2-e1e2-45cc-967e-d48737696b42', 20, 18, 1, '2024-05-04 09:03:54.728181+00', NULL, false, false, true, false, '08/06/2024 - 15/06/2024', '{"6:00 - 8:00","12:00 - 14:00"}');
INSERT INTO public.posts VALUES ('b7bf0b6a-9a96-4a2d-ae60-1143a736753c', 26, 32, 1, '2024-05-26 06:40:17.062613+00', '2024-06-26', true, false, true, false, NULL, NULL);
INSERT INTO public.posts VALUES ('d9ba0ee7-94a6-4bda-b81d-072d9a15d81e', 27, 29, 2, '2024-06-05 12:41:35.906415+00', NULL, false, false, true, false, NULL, NULL);
INSERT INTO public.posts VALUES ('9eebb4c4-4225-4f89-ab14-83da1ab2c750', 24, 26, 1, '2024-05-04 10:02:35.606041+00', NULL, false, false, true, false, NULL, NULL);
INSERT INTO public.posts VALUES ('7f68d143-b166-40d3-9de4-50777cd51967', 25, 31, 2, '2024-05-04 14:50:16.488246+00', NULL, false, false, true, false, NULL, NULL);
INSERT INTO public.posts VALUES ('e74b816c-d50e-46e9-9eae-db82ef8d40f1', 17, 18, 1, '2024-04-29 15:30:19.611729+00', NULL, false, false, true, false, '17/06/2024 - 29/06/2024', '{"6:00 - 8:00","8:00 - 10:00","16:00 - 18:00"}');
INSERT INTO public.posts VALUES ('363f7354-3bad-4a11-8911-4e5c99c69961', 21, 29, 2, '2024-05-04 09:24:50.31534+00', NULL, false, false, true, false, NULL, NULL);
INSERT INTO public.posts VALUES ('f6a20676-a266-4139-8edf-3900b6e5ca03', 28, 18, 1, '2024-06-16 14:43:35.717442+00', NULL, false, false, true, false, NULL, NULL);
INSERT INTO public.posts VALUES ('c14d78db-eb36-45a3-b302-fc973bc82b2d', 18, 18, 1, '2024-05-04 08:51:10.848886+00', '2024-05-14', true, false, false, false, '04/06/2024 - 14/06/2024', '{"6:00 - 8:00","8:00 - 10:00"}');


--
-- Data for Name: purchase_history; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.purchase_history VALUES (2, 18, 1, '2024-05-13 03:53:41.247+00', '2024-05-12 03:53:41.276947+00');
INSERT INTO public.purchase_history VALUES (3, 30, 2, '2024-05-19 05:07:12.855+00', '2024-05-12 05:07:12.870154+00');
INSERT INTO public.purchase_history VALUES (4, 18, 2, '2024-05-17 13:20:13.059+00', '2024-05-16 13:20:13.077753+00');
INSERT INTO public.purchase_history VALUES (5, 18, 3, '2024-05-22 13:32:30.531+00', '2024-05-21 13:32:30.566231+00');
INSERT INTO public.purchase_history VALUES (6, 18, 3, '2024-05-22 13:32:36.745+00', '2024-05-21 13:32:36.755496+00');
INSERT INTO public.purchase_history VALUES (7, 18, 2, '2024-05-22 13:42:03.769+00', '2024-05-21 13:42:03.786825+00');
INSERT INTO public.purchase_history VALUES (8, 18, 2, '2024-05-22 13:42:09.001+00', '2024-05-21 13:42:09.015336+00');
INSERT INTO public.purchase_history VALUES (9, 18, 3, '2024-05-22 13:43:04.193+00', '2024-05-21 13:43:04.205092+00');
INSERT INTO public.purchase_history VALUES (10, 18, 3, '2024-05-22 13:43:41.889+00', '2024-05-21 13:43:41.906323+00');
INSERT INTO public.purchase_history VALUES (11, 18, 3, '2024-05-22 13:43:48.48+00', '2024-05-21 13:43:48.489546+00');
INSERT INTO public.purchase_history VALUES (12, 18, 3, '2024-05-22 13:44:02.169+00', '2024-05-21 13:44:02.18801+00');
INSERT INTO public.purchase_history VALUES (13, 18, 3, '2024-05-22 13:53:30.677+00', '2024-05-21 13:53:30.690982+00');
INSERT INTO public.purchase_history VALUES (14, 18, 3, '2024-05-22 13:53:35.543+00', '2024-05-21 13:53:35.553428+00');
INSERT INTO public.purchase_history VALUES (15, 18, 4, '2024-06-09 06:13:10.495+00', '2024-06-08 06:13:10.514787+00');


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.roles VALUES (1, 'admin');
INSERT INTO public.roles VALUES (2, 'Chủ trọ');
INSERT INTO public.roles VALUES (3, 'Người thuê');


--
-- Data for Name: room; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.room VALUES (20, 'Cho thuê CC Mini mới, Full nội thất, giá ưu đãi tại ngõ 121 Thịnh Quang, Đống Đa, Hà Nội', 'Bạn đang tìm kiếm một không gian sống nhỏ gọn nhưng có phòng ngủ và phòng khách riêng, đầy đủ tiện nghi và giá cả phải chăng? Xin giới thiệu căn hộ mini tinh tế của chúng tôi, chắc chắn bạn sẽ cảm thấy hài lòng với các đặc điểm sau:<br><br>Vị trí: Ngõ 121 Thịnh Quang, Đống Đa, Hà Nội. Rất gần ngã tư sở, đường Láng, Thái Thịnh và Yên Lãng.<br><br>Giá cả: Giá chỉ từ 6tr đến 6.5tr tùy phòng.<br><br>Ưu tiên: Chúng tôi chân thành chào đón các nữ thuê nhà, đảm bảo môi trường sống hòa thuận.<br><br>Bố trí: Nhà có 7 tầng, tầng 1 để xe, Có Thang máy. Mỗi căn hộ sở hữu thiết kế hiện đại với 1 phòng ngủ, 1 phòng khách và nhà vệ sinh trên diện tích 32m².<br><br>Tiện nghi: Được trang bị đầy đủ các tiện ích cần thiết: điều hòa, bình nóng lạnh, tivi, tủ lạnh, tủ quần áo, tủ bếp trên dưới, bếp từ, bộ ghế sofa, máy giặt riêng. Bạn chỉ cần xách vali đến và ở.<br><br>Dịch vụ vệ sinh: Chúng tôi duy trì không gian chung sạch sẽ với 3 buổi vệ sinh mỗi tuần.<br><br>Biện pháp an toàn: Hệ thống phòng cháy chữa cháy đúng tiêu chuẩn, hiện đại.<br><br>Tòa nhà thông minh: Tòa nhà được trang bị các thiết bị thông minh như: khóa của vân tay, thẻ từ, camera an ninh, website quản lý thông báo phí dịch vụ hàng tháng.<br><br>Thông tin liên hệ: Liên hệ Zalo: 0344 350 998.', 'Ngõ 121 Thịnh Quang, Phường Thịnh Quang, Quận Đống Đa, Thành phố Hà Nội', '{201,1486,1A0415}');
INSERT INTO public.room VALUES (18, 'Cho thuê phòng trọ khép kín, rộng 25m2 giá cho thuê 2,7 triệu/tháng', 'Phòng trọ khép kín, 25m2.<br> Có bình nóng lạnh, điều hòa, khu bếp nấu ăn, phơi quần áo, internet, camera an ninh.', '68 ngõ 1 Đường Phan Đình Giót, Phường Phương Liệt, Quận Thanh Xuân, Hà Nội', '{201,1493,1A0707}');
INSERT INTO public.room VALUES (21, 'Phòng cho thuê tại số 13 Lê Thanh Nghị full đồ 1tr750k', 'Biệt thự ở ghép "full tiện ích" giá chỉ 1 triệu 750k<br><br>Homestay dịch vụ tiện ích<br><br>Vệ sinh sạch sẽ<br><br>An ninh đảm bảo<br><br>Tự do giờ giấc<br><br>Miễn phí wifi<br><br>Sẵn máy lạnh, giường, tủ, quạt...<br><br>Tự do giờ giấc, sử dụng khóa vân tay, có camera an ninh <br><br>Điện nước chia ra, theo giá nhà nước<br><br>Điện nước tính theo bình quân đầu người theo từng phòng, giá theo hoá đơn thực tế nhà nước.', '13 Lê Thanh Nghị, Phường Bách Khoa, Quận Hai Bà Trưng, Hà Nội', '{201,1488,1A0302}');
INSERT INTO public.room VALUES (19, 'Chính chủ cho thuê nhà nguyên căn', 'Cho thuê nhà 40m2x4 tầng, 3pn, 3wc. Gần đường, gần trường, gần chợ.

Ngõ xe ba gác, cách đường ô tô 10m.

Nhà hướng Đông Nam sạch sẽ thoáng mát

Nội thất: full đồ

Tình trạng: Vào ở ngay', '11 Khương Trung, Phường Khương Trung, Quận Thanh Xuân, Thành phố Hà Nội', '{201,1493,1A0704}');
INSERT INTO public.room VALUES (17, 'Cho thuê phòng gần đại học kinh tế quốc dân', 'Chính chủ cho thuê phòng 27m2 , VSKK, có cửa sổ, ban công thoáng mát , 5 phút đi bộ đến NEU , ở 2 người thoải mái. Giá 3;5 triệu.

Đồ có sẵn: điều hòa , nóng lạnh, giường tủ, bàn ghế, kệ bếp, máy giặt chung.

An ninh tốt, yên tĩnh. Địa chỉ : ngõ 377 Giải Phóng.

Liên hệ : 0398879912', 'Ngõ 178 Đường Giải Phóng, Phường Phương Liệt, Quận Thanh Xuân, Thành phố Hà Nội', '{201,1493,1A0707}');
INSERT INTO public.room VALUES (23, 'Tìm nam ở ghép tại Quận Nam Từ Liêm', 'Phòng có diện tích là 25m, hợp đồng 6 tháng gia hạn 1 lần, cọc là 3tr8 (chưa chia)<br><br>Phòng có đủ nội thất (Giường, tủ quần áo, bếp, máy giặt, bạn công, chỗ phơi đồ, tủ lạnh, nồi, bát đũa , điều hòa)<br><br>Có chỗ để xe máy rộng rãi, có thang máy, an ninh tốt đảm bảo, có cam ở hành lang và chỗ để xe.<br><br>Vì là đầu tháng nên đặc biệt khuyến mãi cho bạn đến sớm nhất 200K<br><br>Điện: 2.500k/số ; Nước: 30k/số<br><br>Bản thân: Nam 2002 sinh viên<br><br>Yêu cầu: Nam 2000 trở lên, không xăm, không hút thuốc.', '6 Mễ Trì Hạ, Phường Mễ Trì, Quận Nam Từ Liêm, Thành phố Hà Nội', '{201,3440,13003}');
INSERT INTO public.room VALUES (27, 'Full nội thất - an ninh - giờ giấc tự do', '- Chính chủ cho thuê, phòng mới xây, thoáng mát và an ninh.<br><br>- Trung tâm Q.1, gần chợ, siêu thị, nhà thuốc và trường học (ĐH Khoa Học Tự Nhiên, ĐH Sài Gòn, ĐH Sư Phạm,... ).<br><br>- Lối đi riêng, giờ giấc tự do.<br><br>- Full nội thất: giường nệm, máy lạnh, tủ lạnh, tủ quần áo,.. sân phơi và WC riêng (nóng lạnh đầy đủ)<br><br>- Ưu tiên học sinh, sinh viên, nhân viên VP.<br><br>- Liên hệ cô Hòa: 0909.62.83.95', '212b/78 Đường Nguyễn Trãi, Phường Nguyễn Cư Trinh, Quận 1, Hồ Chí Minh', '{202,1442,20107}');
INSERT INTO public.room VALUES (28, 'Cho Thuê Căn Hộ Studio Khu Vực Ngũ Hành Sơn', 'Khu vực nằm gần trục đường chính Lê Văn Hiến<br><br>Gần chợ Bắc Mỹ An<br><br>Phòng rộng rãi thoáng mát<br><br>Full nội thất<br><br>', ' Đường Đa Mặn 5, Phường Khuê Mỹ, Quận Ngũ Hành Sơn, Đà Nẵng', '{203,1529,40403}');
INSERT INTO public.room VALUES (26, 'Cho thuê toàn bộ toà nhà 6,5 tầng mặt tiền 114 Hoàng Hoa Thám ngay trung tâm quận Hải Châu và Thanh Khê', 'Cho thuê toàn bộ toà nhà 6,5 tầng mặt tiền 114 Hoàng Hoa Thám ngay trung tâm quận Hải Châu và Thanh Khê<br><br>- Địa chỉ: 114, Đường Hoàng Hoa Thám, Phường Hải Châu I, Quận Hải Châu, Đà Nẵng<br><br>- Diện tích đất: 118,8m2 (ngang 7,2m). Diện tích sàn: 640m2.<br><br>- Có thang máy, sân để ô tô 2 chiếc, 6 máy lạnh Daikin inverter 2 ngựa, 2 máy lạnh Daikin inverter, 2 ngựa âm trần, 2 toilet/tầng. Màng rèm, đèn, cửa kính...hầu như đầy đủ không cần phải đầu tư gì thêm.<br><br>- Toà nhà mới xây đầy đủ công năng, trống suốt, sạch sẽ<br><br>- Giá 90 triệu/tháng. Có thương lượng.<br><br>- Liên hệ chủ nhà: O9O25O 5616 - O93 494499O', 'Phan Đình Phùng, Phường Hải Châu  I, Quận Hải Châu, Thành phố Đà Nẵng', '{203,1526,40103}');
INSERT INTO public.room VALUES (22, 'Tìm người ở cùng Homestay cao cấp cho sinh viên chỉ 2.3 tr/tháng (bao điện) ở gần các trường Đại Học', 'Rất phù hợp với sinh viên.<br><br>- Tổng DT sàn 144m², gồm 4 tầng + 01 phòng sinh hoạt chung.<br><br>- Diện tích phòng riêng là 50m².<br><br>- Phong cách thiết kế hiện đại, tiện nghi công năng đầy đủ, WC riêng cho mỗi tầng.<br><br>- Trang bị full nội thất.<br><br>- Đầy đủ tiện nghi.<br><br>- Phòng ốc mới, sạch sẽ và thoáng mát, CÓ ĐIỀU HÒA.<br><br>- Phòng SHC có đầy đủ thiết bị dụng cụ tự phục vụ như ăn nhẹ, coffee, đọc sách, làm việc, chơi nhạc, sinh hoạt nhóm hoặc hoặc tiếp khách. Luôn cho bạn cảm giác thoải mái và yên tâm như chính nhà mình.<br><br>- Vệ sinh phòng và khuôn viên 03 lần/tuần.<br><br>- Tự do giờ giấc, môi trường sống văn minh, thanh lịch.<br><br>- Vị trí thuận lợi:gần các trường Đại Học<br><br>- Giá: 2.3 tr/tháng (bao điện và phí quản lí), tiền cọc 1.5 tháng.<br><br>Hợp đồng dài hạn.', '15 Lê Thanh Nghị, Phường Bạch Mai, Quận Hai Bà Trưng, Thành phố Hà Nội', '{201,1488,1A0303}');
INSERT INTO public.room VALUES (25, 'Tìm bạn ở ghép giá rẻ sv ở quận 12', 'Cần tìm một bạn ở ghép phòng rộng, mới, sạch sẽ, thoáng mát<br><br>Có chổ để xe, wifi, máy lạnh<br><br>Điện 3k5 trên 1 số, nước 100k/1 người<br><br>Tiền phòng 1tr5/ người / tháng<br><br>Bạn nào có nhu cầu liên hệ mình nhé<br><br>Zalo 0385395597', '7A/82 Tô Ngọc Vân, Phường Thạnh Xuân, Quận 12, Thành phố Hồ Chí Minh', '{202,1545,21209}');
INSERT INTO public.room VALUES (24, 'Cho thuê nguyên căn nhà 4 tầng, 3 phòng ngủ. khép kín.', 'Cho thuê nhà chính chủ, 3 phòng ngủ, sạch sẽ, đẹp, yên tĩnh.

Diện tích: 25m2

Ô tô vào sát nhà, thuận tiện giao thông, hợp ở và kinh doanh

Giá thuê: 12tr/tháng

Liên hệ: Trần Lan - 0934475869', '1/14/118 Đào Tấn, Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội', '{201,1484,1A0108}');


--
-- Data for Name: room_amenities; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.room_amenities VALUES (285, 1, 24);
INSERT INTO public.room_amenities VALUES (286, 2, 24);
INSERT INTO public.room_amenities VALUES (287, 3, 24);
INSERT INTO public.room_amenities VALUES (190, 1, 19);
INSERT INTO public.room_amenities VALUES (191, 5, 19);
INSERT INTO public.room_amenities VALUES (192, 2, 19);
INSERT INTO public.room_amenities VALUES (193, 6, 19);
INSERT INTO public.room_amenities VALUES (194, 4, 19);
INSERT INTO public.room_amenities VALUES (195, 2, 20);
INSERT INTO public.room_amenities VALUES (196, 6, 20);
INSERT INTO public.room_amenities VALUES (197, 3, 20);
INSERT INTO public.room_amenities VALUES (198, 1, 20);
INSERT INTO public.room_amenities VALUES (199, 5, 20);
INSERT INTO public.room_amenities VALUES (203, 2, 22);
INSERT INTO public.room_amenities VALUES (204, 6, 22);
INSERT INTO public.room_amenities VALUES (205, 5, 22);
INSERT INTO public.room_amenities VALUES (206, 1, 22);
INSERT INTO public.room_amenities VALUES (207, 4, 22);
INSERT INTO public.room_amenities VALUES (208, 3, 22);
INSERT INTO public.room_amenities VALUES (209, 1, 23);
INSERT INTO public.room_amenities VALUES (210, 5, 23);
INSERT INTO public.room_amenities VALUES (211, 6, 23);
INSERT INTO public.room_amenities VALUES (212, 2, 23);
INSERT INTO public.room_amenities VALUES (213, 3, 23);
INSERT INTO public.room_amenities VALUES (214, 4, 23);
INSERT INTO public.room_amenities VALUES (288, 4, 24);
INSERT INTO public.room_amenities VALUES (289, 5, 24);
INSERT INTO public.room_amenities VALUES (290, 6, 24);
INSERT INTO public.room_amenities VALUES (361, 1, 27);
INSERT INTO public.room_amenities VALUES (362, 5, 27);
INSERT INTO public.room_amenities VALUES (363, 9, 27);
INSERT INTO public.room_amenities VALUES (364, 11, 27);
INSERT INTO public.room_amenities VALUES (365, 14, 27);
INSERT INTO public.room_amenities VALUES (366, 7, 27);
INSERT INTO public.room_amenities VALUES (182, 1, 17);
INSERT INTO public.room_amenities VALUES (183, 2, 17);
INSERT INTO public.room_amenities VALUES (367, 4, 27);
INSERT INTO public.room_amenities VALUES (368, 3, 27);
INSERT INTO public.room_amenities VALUES (369, 6, 27);
INSERT INTO public.room_amenities VALUES (370, 2, 27);
INSERT INTO public.room_amenities VALUES (371, 8, 27);
INSERT INTO public.room_amenities VALUES (233, 1, 25);
INSERT INTO public.room_amenities VALUES (234, 5, 25);
INSERT INTO public.room_amenities VALUES (235, 2, 25);
INSERT INTO public.room_amenities VALUES (236, 6, 25);
INSERT INTO public.room_amenities VALUES (378, 3, 18);
INSERT INTO public.room_amenities VALUES (185, 5, 17);
INSERT INTO public.room_amenities VALUES (186, 6, 17);
INSERT INTO public.room_amenities VALUES (379, 6, 18);
INSERT INTO public.room_amenities VALUES (380, 7, 18);
INSERT INTO public.room_amenities VALUES (381, 9, 18);
INSERT INTO public.room_amenities VALUES (382, 11, 18);
INSERT INTO public.room_amenities VALUES (383, 14, 18);
INSERT INTO public.room_amenities VALUES (384, 1, 21);
INSERT INTO public.room_amenities VALUES (385, 2, 21);
INSERT INTO public.room_amenities VALUES (386, 3, 21);
INSERT INTO public.room_amenities VALUES (387, 5, 21);
INSERT INTO public.room_amenities VALUES (388, 6, 21);
INSERT INTO public.room_amenities VALUES (389, 2, 28);
INSERT INTO public.room_amenities VALUES (390, 1, 28);
INSERT INTO public.room_amenities VALUES (391, 5, 28);
INSERT INTO public.room_amenities VALUES (392, 3, 28);
INSERT INTO public.room_amenities VALUES (393, 6, 28);
INSERT INTO public.room_amenities VALUES (394, 8, 28);
INSERT INTO public.room_amenities VALUES (395, 9, 28);
INSERT INTO public.room_amenities VALUES (336, 1, 26);
INSERT INTO public.room_amenities VALUES (337, 2, 26);
INSERT INTO public.room_amenities VALUES (338, 5, 26);
INSERT INTO public.room_amenities VALUES (339, 7, 26);
INSERT INTO public.room_amenities VALUES (340, 14, 26);


--
-- Data for Name: room_detail; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.room_detail VALUES (26, 27, 2, 2, 30, 'ALL', 4000000);
INSERT INTO public.room_detail VALUES (21, 22, 4, 6, 50, 'ALL', 2300000);
INSERT INTO public.room_detail VALUES (19, 20, 3, 3, 32, 'FM', 7000000);
INSERT INTO public.room_detail VALUES (22, 23, 2, 1, 25, 'M', 4500000);
INSERT INTO public.room_detail VALUES (25, 26, 1, 5, 120, 'ALL', 12000000);
INSERT INTO public.room_detail VALUES (23, 24, 1, 6, 25, 'FM', 1200000);
INSERT INTO public.room_detail VALUES (16, 17, 2, 3, 27, 'ALL', 3600000);
INSERT INTO public.room_detail VALUES (18, 19, 1, 5, 40, 'ALL', 5500000);
INSERT INTO public.room_detail VALUES (24, 25, 2, 1, 20, 'M', 900000);
INSERT INTO public.room_detail VALUES (17, 18, 2, 2, 25, 'FM', 2700000);
INSERT INTO public.room_detail VALUES (20, 21, 2, 1, 20, 'ALL', 1750000);
INSERT INTO public.room_detail VALUES (27, 28, 3, 2, 40, 'ALL', 4500000);


--
-- Data for Name: room_images; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.room_images VALUES (274, 21, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714814689/images/05862ad3-cd5b-4ab1-9b3f-9b1f5fc4db92.jpg');
INSERT INTO public.room_images VALUES (275, 21, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714814689/images/322a9961-3725-4e01-8722-71c5184dca9c.jpg');
INSERT INTO public.room_images VALUES (276, 21, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714814689/images/6af069d2-4f8b-4dc0-9c82-0c1bdff938cb.jpg');
INSERT INTO public.room_images VALUES (277, 21, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1716818566/images/d07a417c-1da4-4374-9688-0045509fc9f4.jpg');
INSERT INTO public.room_images VALUES (104, 19, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714812980/images/c8427954-47fd-421a-99b0-5efaa83ddc07.jpg');
INSERT INTO public.room_images VALUES (105, 19, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714812979/images/d264c202-336b-4d35-aada-acd9dd9d852d.jpg');
INSERT INTO public.room_images VALUES (106, 19, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714812979/images/9fe96922-e527-4f9d-8f2b-21bf3930053d.jpg');
INSERT INTO public.room_images VALUES (107, 19, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714812979/images/eb37e888-e935-46ce-b7ed-23c22b9a6cc8.jpg');
INSERT INTO public.room_images VALUES (108, 19, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714812979/images/e856358b-b04a-4cc3-8821-822416a7dca9.jpg');
INSERT INTO public.room_images VALUES (109, 20, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714813433/images/e7fa299d-82fe-444f-9ffc-6ee2ba173525.jpg');
INSERT INTO public.room_images VALUES (110, 20, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714813433/images/b352ac7a-34c2-4f90-9413-777ab0bded43.jpg');
INSERT INTO public.room_images VALUES (111, 20, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714813434/images/3a898d20-e10d-43ef-a29e-936f0171040e.jpg');
INSERT INTO public.room_images VALUES (112, 20, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714813434/images/14070548-fa15-4733-8f21-8a6b22e415a5.jpg');
INSERT INTO public.room_images VALUES (113, 20, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714813433/images/8d003c5c-a89f-40d0-870d-647e150ef86d.jpg');
INSERT INTO public.room_images VALUES (278, 28, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1718549014/images/c28fac28-1b0b-4529-88a6-a885ffcf36ee.jpg');
INSERT INTO public.room_images VALUES (279, 28, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1718549013/images/97554a4f-85c9-4013-bb7c-6d5079a2a8e4.jpg');
INSERT INTO public.room_images VALUES (280, 28, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1718549013/images/4d4834ed-e0a4-47ca-bedc-c460bd111e1e.jpg');
INSERT INTO public.room_images VALUES (117, 22, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714815693/images/bd405d3d-bc88-420e-a0b5-206ff2b7cc90.jpg');
INSERT INTO public.room_images VALUES (118, 22, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714815694/images/7fef31ca-cf6a-404f-87e9-c0d299928204.jpg');
INSERT INTO public.room_images VALUES (119, 22, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714815694/images/1f9c9fb8-3cdc-4d6a-8152-37fde3658f57.jpg');
INSERT INTO public.room_images VALUES (120, 22, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714815694/images/7baca471-ff5c-4e60-a487-52c755cbf055.jpg');
INSERT INTO public.room_images VALUES (121, 22, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714815693/images/aa8b4074-d848-41cf-881a-dea6b457203d.jpg');
INSERT INTO public.room_images VALUES (122, 22, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714815694/images/358d9494-05c7-4e94-a397-46339ec8fca4.jpg');
INSERT INTO public.room_images VALUES (123, 23, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714816391/images/60d101b2-6365-4023-832e-851aac4b8b4f.jpg');
INSERT INTO public.room_images VALUES (124, 23, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714816391/images/be3a7884-0d4b-47af-a2e5-76f41690c415.jpg');
INSERT INTO public.room_images VALUES (125, 23, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714816391/images/535a2663-3d9c-459d-a65f-0d161c487d5c.jpg');
INSERT INTO public.room_images VALUES (126, 23, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714816392/images/30ee9f00-a8be-460f-b6be-c7b68d83d9d9.jpg');
INSERT INTO public.room_images VALUES (127, 23, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714816391/images/2719e711-3fc2-4801-8cf7-6203d9a6348c.jpg');
INSERT INTO public.room_images VALUES (281, 28, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1718549014/images/f65066d5-50c0-480b-9f6b-c565e324654f.jpg');
INSERT INTO public.room_images VALUES (97, 17, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714461309/images/378b5268-2955-48b7-9399-3fbb1dd28e1e.jpg');
INSERT INTO public.room_images VALUES (98, 17, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714404615/images/260c120c-b6d4-4992-9dc9-f7c50fdee7ee.jpg');
INSERT INTO public.room_images VALUES (99, 17, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714461288/images/c2068d98-1f6d-479f-92a0-4d9a9457fbbb.jpg');
INSERT INTO public.room_images VALUES (143, 25, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714834215/images/522bc6cc-ca4e-4f79-a1a9-d3d40feb2da9.jpg');
INSERT INTO public.room_images VALUES (144, 25, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714834213/images/299dbd7f-d937-4daa-b798-52ea0096ddc6.jpg');
INSERT INTO public.room_images VALUES (145, 25, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714834214/images/3ecb1836-ddfe-416c-9ebd-7ad605557eb5.jpg');
INSERT INTO public.room_images VALUES (146, 25, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714834213/images/89015e37-8d9d-4d87-8221-56dd2a89f4fa.jpg');
INSERT INTO public.room_images VALUES (239, 26, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1716705616/images/0ce3f196-f7ac-425c-8da2-9ae6ec72f1e7.jpg');
INSERT INTO public.room_images VALUES (240, 26, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1716705616/images/28aa57e2-8e4f-4c68-9791-33030e7f5cc6.jpg');
INSERT INTO public.room_images VALUES (241, 26, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1716705616/images/bca110a4-2aa4-47de-ba3d-a6b9000abff0.jpg');
INSERT INTO public.room_images VALUES (242, 26, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1716705616/images/f3160286-9df6-4bbb-bef6-9e9948d63376.jpg');
INSERT INTO public.room_images VALUES (243, 26, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1716705616/images/f3cdbae5-be7b-40d5-a306-e4f874924dee.jpg');
INSERT INTO public.room_images VALUES (244, 26, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1716705616/images/ff38c3b9-9180-40e1-b00e-37b007a15b5e.jpg');
INSERT INTO public.room_images VALUES (261, 27, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1717591295/images/62a6ce8b-0b99-4762-b505-f72e787af149.jpg');
INSERT INTO public.room_images VALUES (262, 27, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1717591295/images/feb2a640-568e-45ba-938c-2d442841f55d.jpg');
INSERT INTO public.room_images VALUES (195, 24, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714816953/images/83a927a7-8e88-447f-9b7f-5267f88f42c1.jpg');
INSERT INTO public.room_images VALUES (196, 24, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714816953/images/8535041c-acf9-41b5-aae0-a796b2a4f8a0.jpg');
INSERT INTO public.room_images VALUES (197, 24, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714816953/images/da111eef-714f-49a8-a385-c41eb1641970.jpg');
INSERT INTO public.room_images VALUES (198, 24, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714816953/images/da253e69-21f4-40d1-84d5-b609246d2b67.jpg');
INSERT INTO public.room_images VALUES (199, 24, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714816954/images/ec1a380a-820d-46e8-bfb0-acc77fd97c47.jpg');
INSERT INTO public.room_images VALUES (263, 27, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1717591293/images/923690c4-15fb-4112-adc2-e1f8e3af60b7.jpg');
INSERT INTO public.room_images VALUES (264, 27, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1717591293/images/c42c0bf2-a6b8-447f-ae1b-3a15e3ce112b.jpg');
INSERT INTO public.room_images VALUES (265, 27, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1717591295/images/366063e6-5100-44ad-a8dc-dbdc0d12e43a.jpg');
INSERT INTO public.room_images VALUES (270, 18, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714812669/images/0c3de10b-696f-48ce-8de4-bb308c0c407e.jpg');
INSERT INTO public.room_images VALUES (271, 18, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714812669/images/a26a7d03-dc90-44fd-8277-cba9095e8bf9.jpg');
INSERT INTO public.room_images VALUES (272, 18, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714812670/images/fc6af26c-061b-400d-805a-9f15ae07e0c2.jpg');
INSERT INTO public.room_images VALUES (273, 18, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1716474597/images/f92b829e-a4d3-4442-afa8-dc0bcbb23c66.jpg');


--
-- Data for Name: room_type; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.room_type VALUES (1, 'Cho thuê nguyên căn');
INSERT INTO public.room_type VALUES (2, 'Phòng trọ');
INSERT INTO public.room_type VALUES (3, 'Căn hộ mini');
INSERT INTO public.room_type VALUES (4, 'Homestay');


--
-- Data for Name: services; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.services VALUES (3, 'VIP 3', 20000, 120000, 480000, '- Lượt xem nhiều gấp 5 lần so với tin thường<br><br>- Tiếp cận khách hàng tốt.<br><br>- Xuất hiện sau VIP 2 và trước tin thường.<br><br>- Xuất hiện thêm ở mục tin nổi bật xuyên suốt khu vực chuyên mục đó. ', '#F56526', false, true, '1 week', 58);
INSERT INTO public.services VALUES (4, 'VIP 4', 0, 0, 0, '- Tiếp cận khách hàng khá tốt.<br><br>- Xuất hiện sau các loại tin VIP.', '#0879FA', false, false, '3 day', 21);
INSERT INTO public.services VALUES (1, 'VIP 1', 80000, 500000, 1800000, '- Lượt xem nhiều gấp 30 lần so với tin thường<br><br>- Ưu việt, tiếp cận tối đa khách hàng.<br><br>- Xuất hiện vị trí đầu tiên ở trang chủ<br><br>- Đứng trên tất cả các loại tin VIP khác<br><br>- Xuất hiện đầu tiên ở mục tin nổi bật xuyên suốt khu vực chuyên mục đó. ', '#cd321d', true, true, '1 month', 12);
INSERT INTO public.services VALUES (2, 'VIP 2', 40000, 250000, 1000000, '- Lượt xem nhiều gấp 15 lần so với tin thường<br><br>- Tiếp cận rất nhiều khách hàng.<br><br>- Xuất hiện sau VIP 1 và trước VIP 3, tin thường.<br><br>- Xuất hiện thêm ở mục tin nổi bật xuyên suốt khu vực chuyên mục đó. ', '#EC5A9E', false, true, '2 week', 34);


--
-- Data for Name: transactions; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.transactions VALUES (31, 18, 10000, '2024-05-22 09:12:17.864161+00', '10625', NULL, 'CANCELLED');
INSERT INTO public.transactions VALUES (32, 18, 10000, '2024-05-22 13:49:04.037209+00', '99247', 'ND:CT DEN:220T24511GFZ1REH Thanh toan QR-CSJOIE0A135 Thanh toan 10000', 'PAID');
INSERT INTO public.transactions VALUES (33, 18, 10000, '2024-05-26 03:05:45.73803+00', '9661', '', 'CANCELLED');


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.users VALUES (29, 'Mai Ngọc Lan', 'lehoangtptn@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0912345672', 3, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1714465361/images/053f1562-2d9f-4fa2-b641-9ffdb0dd54c3.jpg', 0, false, NULL, 4, '2024-05-07 13:57:02.396254+00');
INSERT INTO public.users VALUES (18, 'Lê Hoàng', 'thetanerea147@gmail.com', '15e2b0d3c33891ebb0f1ef609ec419420c20e320ce94c65fbc8c3312448eb225', '0896321525', 2, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1718201403/images/170108ab-9d00-4942-acbe-3d8df817ee36.jpg', 10000, false, NULL, 4, '2024-05-07 13:57:02.396254+00');
INSERT INTO public.users VALUES (38, 'Trần Bình', 'binhtran@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0159852301', 3, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1716993908/images/5d360d65-1ded-4bb0-964c-ec27dd39d334.jpg', 0, false, NULL, 4, '2024-05-29 14:45:09.224479+00');
INSERT INTO public.users VALUES (25, 'Quản trị viên', '@admin', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0985247101', 1, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1713001231/images/dad26239-6735-4630-8b69-f2a54c63acd8.jpg', 0, false, NULL, 4, '2024-05-07 13:57:02.396254+00');
INSERT INTO public.users VALUES (26, 'Nguyễn Mai Linh', 'darkbuhlemai@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0987654321', 2, NULL, 0, false, NULL, 4, '2024-05-07 13:57:02.396254+00');
INSERT INTO public.users VALUES (27, 'Trần Văn An', 'forriot147@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0369258147', 2, NULL, 0, false, NULL, 4, '2024-05-07 13:57:02.396254+00');
INSERT INTO public.users VALUES (30, 'Phạm Mai Anh', 'hoangithub147@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0965231526', 2, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1715490264/images/903d1fe2-7cbb-48d2-a7a4-ffc7b70fe4ff.jpg', 0, false, NULL, 4, '2024-05-07 13:57:02.396254+00');
INSERT INTO public.users VALUES (28, 'Lê Thị Hương', 'forshopify147@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0246813579', 3, NULL, 0, false, NULL, 4, '2024-05-07 13:57:02.396254+00');
INSERT INTO public.users VALUES (31, 'Nguyễn Văn Long', 'forbluestack147@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0952364852', 3, NULL, 0, false, NULL, 4, '2024-05-07 13:57:02.396254+00');
INSERT INTO public.users VALUES (33, 'Đinh Thanh Hải', 'dthk164@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '09253621458', 3, NULL, 0, false, NULL, 4, '2024-05-07 13:57:02.396254+00');
INSERT INTO public.users VALUES (32, 'Lê Ngọc Anh', 'forgradu1@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0823612456', 2, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1716704177/images/5bb38b22-3e21-4d5b-aff4-743c580032ab.jpg', 0, false, '2024-06-25 00:00:00+00', 1, '2024-05-07 13:57:02.396254+00');
INSERT INTO public.users VALUES (34, 'Lê Thúy Nga', 'dinhthanhhai.2001@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0236596521', 2, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1715089619/images/39b61a2d-1a49-4aa4-bf64-f7680f8c36b7.jpg', 0, false, NULL, 4, '2024-05-07 13:57:02.396254+00');
INSERT INTO public.users VALUES (36, 'Nguyễn Thùy Linh', 'thuylinh@email.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0923652362', 3, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1715090337/images/aa6968bd-0e03-4540-a75d-f8cbd56621be.jpg', 0, false, NULL, 4, '2024-05-07 13:58:58.116907+00');
INSERT INTO public.users VALUES (37, 'Duy Tùng', 'tungnd@gmail.com', '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', '0236215952', 3, 'https://res.cloudinary.com/ds25tddiq/image/upload/v1716694617/images/2f05e7d8-f8dd-4c07-8d88-ccf84252dee4.jpg', 0, false, NULL, 4, '2024-05-26 03:36:59.336868+00');


--
-- Data for Name: viewing_requests; Type: TABLE DATA; Schema: public; Owner: root
--

INSERT INTO public.viewing_requests VALUES (30, 'e74b816c-d50e-46e9-9eae-db82ef8d40f1', '2024-06-17', '2024-06-15 07:41:52.738257+00', '16:00 - 18:00', 29, false, '', false, NULL);


--
-- Name: amenities_amenities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.amenities_amenities_id_seq', 14, true);


--
-- Name: comments_comment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.comments_comment_id_seq', 19, true);


--
-- Name: contact_contact_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.contact_contact_id_seq', 9, true);


--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.favorites_favorite_id_seq', 78, true);


--
-- Name: knex_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.knex_migrations_id_seq', 76, true);


--
-- Name: knex_migrations_lock_index_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.knex_migrations_lock_index_seq', 1, true);


--
-- Name: post_type_post_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.post_type_post_type_id_seq', 1, false);


--
-- Name: purchase_history_history_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.purchase_history_history_id_seq', 15, true);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 3, true);


--
-- Name: room_detail_room_detail_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.room_detail_room_detail_id_seq', 27, true);


--
-- Name: room_images_room_images_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.room_images_room_images_id_seq', 281, true);


--
-- Name: room_room_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.room_room_id_seq', 28, true);


--
-- Name: room_type_room_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.room_type_room_type_id_seq', 1, false);


--
-- Name: rooms_amenities_rooms_amenities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.rooms_amenities_rooms_amenities_id_seq', 395, true);


--
-- Name: services_service_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.services_service_id_seq', 1, false);


--
-- Name: transactions_transaction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.transactions_transaction_id_seq', 33, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.users_user_id_seq', 38, true);


--
-- Name: viewing_requests_request_id_seq; Type: SEQUENCE SET; Schema: public; Owner: root
--

SELECT pg_catalog.setval('public.viewing_requests_request_id_seq', 30, true);


--
-- Name: amenities amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.amenities
    ADD CONSTRAINT amenities_pkey PRIMARY KEY (amenity_id);


--
-- Name: comments comments_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_pkey PRIMARY KEY (comment_id);


--
-- Name: contacts contact_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.contacts
    ADD CONSTRAINT contact_pkey PRIMARY KEY (contact_id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favorite_id);


--
-- Name: knex_migrations_lock knex_migrations_lock_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.knex_migrations_lock
    ADD CONSTRAINT knex_migrations_lock_pkey PRIMARY KEY (index);


--
-- Name: knex_migrations knex_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.knex_migrations
    ADD CONSTRAINT knex_migrations_pkey PRIMARY KEY (id);


--
-- Name: post_type post_type_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.post_type
    ADD CONSTRAINT post_type_pkey PRIMARY KEY (post_type_id);


--
-- Name: posts posts_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_pkey PRIMARY KEY (post_id);


--
-- Name: purchase_history purchase_history_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.purchase_history
    ADD CONSTRAINT purchase_history_pkey PRIMARY KEY (history_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: room_detail room_detail_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_detail
    ADD CONSTRAINT room_detail_pkey PRIMARY KEY (room_detail_id);


--
-- Name: room_images room_images_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_images
    ADD CONSTRAINT room_images_pkey PRIMARY KEY (room_images_id);


--
-- Name: room room_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room
    ADD CONSTRAINT room_pkey PRIMARY KEY (room_id);


--
-- Name: room_type room_type_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_type
    ADD CONSTRAINT room_type_pkey PRIMARY KEY (room_type_id);


--
-- Name: room_amenities rooms_amenities_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_amenities
    ADD CONSTRAINT rooms_amenities_pkey PRIMARY KEY (rooms_amenities_id);


--
-- Name: services services_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.services
    ADD CONSTRAINT services_pkey PRIMARY KEY (service_id);


--
-- Name: transactions transactions_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_pkey PRIMARY KEY (transaction_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: viewing_requests viewing_requests_pkey; Type: CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.viewing_requests
    ADD CONSTRAINT viewing_requests_pkey PRIMARY KEY (request_id);


--
-- Name: comments comments_post_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_post_id_foreign FOREIGN KEY (post_id) REFERENCES public.posts(post_id);


--
-- Name: comments comments_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.comments
    ADD CONSTRAINT comments_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: favorites favorites_post_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_post_id_foreign FOREIGN KEY (post_id) REFERENCES public.posts(post_id);


--
-- Name: favorites favorites_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: posts posts_post_type_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_post_type_id_foreign FOREIGN KEY (post_type_id) REFERENCES public.post_type(post_type_id);


--
-- Name: posts posts_room_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_room_id_foreign FOREIGN KEY (room_id) REFERENCES public.room(room_id);


--
-- Name: posts posts_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.posts
    ADD CONSTRAINT posts_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: purchase_history purchase_history_service_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.purchase_history
    ADD CONSTRAINT purchase_history_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(service_id);


--
-- Name: purchase_history purchase_history_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.purchase_history
    ADD CONSTRAINT purchase_history_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: room_detail room_detail_room_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_detail
    ADD CONSTRAINT room_detail_room_id_foreign FOREIGN KEY (room_id) REFERENCES public.room(room_id);


--
-- Name: room_detail room_detail_room_type_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_detail
    ADD CONSTRAINT room_detail_room_type_id_foreign FOREIGN KEY (room_type_id) REFERENCES public.room_type(room_type_id);


--
-- Name: room_images room_images_room_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_images
    ADD CONSTRAINT room_images_room_id_foreign FOREIGN KEY (room_id) REFERENCES public.room(room_id);


--
-- Name: room_amenities rooms_amenities_amenities_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_amenities
    ADD CONSTRAINT rooms_amenities_amenities_id_foreign FOREIGN KEY (amenity_id) REFERENCES public.amenities(amenity_id);


--
-- Name: room_amenities rooms_amenities_room_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.room_amenities
    ADD CONSTRAINT rooms_amenities_room_id_foreign FOREIGN KEY (room_id) REFERENCES public.room(room_id);


--
-- Name: transactions transactions_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.transactions
    ADD CONSTRAINT transactions_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- Name: users users_role_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_role_id_foreign FOREIGN KEY (role_id) REFERENCES public.roles(role_id);


--
-- Name: users users_service_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_service_id_foreign FOREIGN KEY (service_id) REFERENCES public.services(service_id);


--
-- Name: viewing_requests viewing_requests_post_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.viewing_requests
    ADD CONSTRAINT viewing_requests_post_id_foreign FOREIGN KEY (post_id) REFERENCES public.posts(post_id);


--
-- Name: viewing_requests viewing_requests_user_id_foreign; Type: FK CONSTRAINT; Schema: public; Owner: root
--

ALTER TABLE ONLY public.viewing_requests
    ADD CONSTRAINT viewing_requests_user_id_foreign FOREIGN KEY (user_id) REFERENCES public.users(user_id);


--
-- PostgreSQL database dump complete
--

